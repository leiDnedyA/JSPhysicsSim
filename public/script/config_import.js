
const importConfigJSON = (url)=>{
	$.ajax({type: "GET", 
		url: url, 
		processData: true, 
		data: {}, 
		dataType: "json", 
		success: (json)=>{

		},
		error: (xhr, ajaxOptions, thrownError)=>{
			console.log(xhr.responseText)
			const CONFIG = xhr.responseText;
			for(let i in CONFIG){
				if (i=="unitSize"){
					const unitSize = parseInt(CONFIG[i]);
				}
			}
		}
		})
	$.getJSON(url, (response)=>{
		console.log(response)
	})
}