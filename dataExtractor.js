function extractCountryCode(data){
	let countryCodeArray = [];
	data.forEach(country=>{
		let countryObj = {};
		countryObj['country'] = country.country;
		countryObj['countryCode'] = country.countryCode;
		countryCodeArray.push(countryObj);				
	});
	return countryCodeArray;
}


function insertCountryCodes(data, countryCodes){
	data.forEach(row=>{
		countryCodes.forEach(code =>{
			if(row.country === code.country) row['countryCode'] = code.countryCode;
		});
	});
}


function formatData(data, countryCodeData){

	const countryCodes = extractCountryCode(countryCodeData);
	insertCountryCodes(data,countryCodes);

	var yearObj = {};

    for(let i =0; i< data.length; i++){
    	var arr = [];

    	//if the year does not exist in yearObj, create a new key with empty array.
    	if(!yearObj[data[i].year]) {
    		yearObj[data[i].year] = arr;
    		arr.push(parseObject(data[i]));
    	//If it does, just push that line to the corresponding uear
    	}else{
    		yearObj[data[i].year].push(parseObject(data[i]));
    	}
    }

    return yearObj;
}

function parseObject(data){
	var obj = {};
	obj.country = data.country;
	obj.refugeeByCountryOfOrigin = +data.refugeeByCountryOfOrigin;
	obj.refugeeByCountryOfAsylum = +data.refugeeByCountryOfAsylum;
	obj.countryCode = data.countryCode;


	return obj;
}