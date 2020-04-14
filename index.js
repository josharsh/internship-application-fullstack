//Declaration
const dataAPIVar = 'https://cfw-takehome.developers.workers.dev/api/variants'

//Listening for fetch
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// To choose a random URL from the array of URLs
function random(mn, mx) {  
            return Math.random() * (mx - mn) + mn;  
        }  

// Async call to get data (URLs)
async function getData() {
    let resData = await fetch(dataAPIVar)
    let Obj = await resData.json()
    return Obj.variants
}
// To Render the Selected URL
 async function renderRes(url) {
    let res= await fetch(url)
	// Since Body has already been used, and can't be used again I have used TransformStream to append to it.
	// Reference - https://community.cloudflare.com/t/support-for-transformers-in-transformstreams/66534
	//let red=ReadableStream()
	//let wri=WritableStream()
    let {readable,writable} = new TransformStream()
    res.body.pipeTo(writable)
    let toDisplay = new Response(readable, res)
	
    //return red.tee(res)
	return toDisplay
}

function getRandomURL(arraysInput) {
	return arraysInput[Math.floor(random(0,2))]
    
}
// Request Handler
async function handleRequest(request) {
  let arrayOfURLS = await getData()
    selectedURL = getRandomURL(arrayOfURLS)
	return renderRes(selectedURL)
}