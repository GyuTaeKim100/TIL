const {fromEvent, from, merge} = rxjs
const {ajax} = rxjs.ajax
const {mergeMap, switchMap, pluck, retry, map,mapTo, scan, filter, debounceTime, distinctUntilChanged} = rxjs.operators

const url = 'http://127.0.0.1:3000/people/quarter-error'
const keyword = document.querySelector('#keyword')
const result = document.querySelector('#result')

const searchInit$ = fromEvent(keyword, 'keyup').pipe(
    // backspace 시, 요청 안함.
    filter(event => event.code != 'Backspace'),
    pluck('target', 'value'),
    // 불필요한 요청 최소화
    filter(typed => typed.length > 1), // 1글자 이상일 경우만
    debounceTime(500), // 0.5초 공백 후 발행
    distinctUntilChanged(), // 연속된 같은 문자열 생략

)

const searching$ = searchInit$.pipe(
    mapTo(`<div class="searching">Searching ...</div>`)    
)

const searchResult$=  searchInit$.pipe( 
    switchMap(keyword => 
        ajax(`${url}?name=${keyword}`).pipe(retry(3))
    ),
    pluck('response'),
    // mergeMap or switchMap
    mergeMap(results =>  from(results).pipe(
        map(person => `${person.first_name} ${person.last_name}`),
        map(name => `<article> ${name} </article>`),
        scan((acc, article) => acc += article, '')
    ))
)

merge(
    searching$,
    searchResult$
).subscribe(text => result.innerHTML = text)

