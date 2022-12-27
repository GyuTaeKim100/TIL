const {fromEvent, from} = rxjs
const {ajax} = rxjs.ajax
const {mergeMap, switchMap, pluck, retry, map, scan, filter, debounceTime, distinctUntilChanged} = rxjs.operators

const url = 'http://127.0.0.1:3000/people/quarter-error'
const keyword = document.querySelector('#keyword')
const result = document.querySelector('#result')

fromEvent(keyword, 'keyup').pipe(
    pluck('target', 'value'),
    mergeMap(keyword => 
        ajax(`${url}?name=${keyword}`).pipe(retry(3))        
    ),
    pluck('response')
).subscribe(showResults)

function showResults (results) {
    console.log('results',results)
    from(results).pipe(
        map(person => `${person.first_name} ${person.last_name}`),
        map(name => `<article> ${name} </article>`),
        scan((acc, article) => acc += article, '')
    ).subscribe(people => result.innerHTML = people)
}
