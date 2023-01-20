const {Subject, BehaviorSubject, fromEvent, combineLatest, from, iif, of, empty} = rxjs
const { ajax } = rxjs.ajax
const { tap, switchMap,  pluck, startWith, filter, timeInterval, map, scan, reduce, skip} = rxjs.operators

const given = document.getElementById('given')
const input = document.getElementById('input')
const start = document.getElementById('start')
const logs = document.getElementById('logs')

const wordSubject = new Subject().pipe(
        tap(word => given.innerHTML = `<span class="word">${word}</span>`)
    )

const ajaxSubject = new Subject().pipe(
        tap( _ => given.innerHTML = `<span class="loading">LOADING...</span>`),
        switchMap(_ => ajax('http://localhost:3000/people/name/random').pipe(
            pluck('response', Math.random() > 0.5 ? 'first_name': 'last_name'),
            tap(console.log)
        ))
    )

ajaxSubject.subscribe(word => {
    console.log('ajaxSubject subscribe - word', word)
    wordSubject.next(word)
})

fromEvent(start, 'click').subscribe(_ => {
    input.focus()
    ajaxSubject.next()
})

combineLatest(
    wordSubject,
    fromEvent(input, 'keyup').pipe(
            pluck('target', 'value'),
            startWith(null) // 첫 단어 직전의 null과 combine 되기 위한 초기값
        )
    ).pipe(
        // TODO: iif로 timeInterval를 효과적으로 호출하기
        switchMap(x => 
            iif((el) => {
                console.log('el', el)
                !el?.keyword
            },
            empty(),
            timeInterval(x)
        ),
        filter((x)=> {
            console.log('x',x)

            return false
        })
    )    
).subscribe((result)=> {
    console.log('combineLatest subscribe result', result)

    if(result.value[0] !== null) {  // 받아온 이름과 타이핑이 일치할 때
        console.log('???')
        input.value = ''
        ajaxSubject.next()
    }
    printRecords({
        interval: result.interval,
        value: result.value[0]
    })
})

const recordSubject = new BehaviorSubject({
    records: [],
    average: null
}).pipe(
    tap((result) => console.log('recordSubject - result', result)),
    filter(result => result.value !== null),
    tap(()=> console.log('passed')),
    scan((acc, cur)=> {
        acc.records.push(cur)
        from(acc.records).pipe(
            reduce((acc2, cur2) => {
                return {
                    lettersTotal: acc2.lettersTotal += cur2.value.length,
                    intervalTotal: acc2.intervalTotal += cur2.interval
                }
            }, {
                lettersTotal: 0,
                intervalTotal: 0
            })
        ).subscribe(result => {
            acc.average = result.intervalTotal / result.lettersTotal
        })
        return acc
    })    
)

// rxjs docs BehaviorSubject
//  'A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.'
// skip(1)을 하는 이유는, BehaviorSubject의 특성 때문이다.
recordSubject.pipe(skip(1)).subscribe(result => {
    logs.innerHTML = `<div class="average">Average: <span>${result.average}</span></div>`
    + result.records.map(record => {
        return `<div class="score"> ${record.value}: <span>${record.interval}</span> </div>`
    }).join('')
})

function printRecords (result) {
    console.log('printRecords - result', result)

    recordSubject.next(result)
}

