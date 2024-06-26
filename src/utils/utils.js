export function rearrangeData(importdatas, dates) {
    if (importdatas.length == 0) {
        return [];
    }
    // Company 
    let datas = [];
    let companies = ['3*9', '5*4', '8*2'];
    for (let companyname of companies) {
        let filterdData = importdatas.filter(
            (obj) => obj.organization === companyname
        );
        if(filterdData.length){

            // Initialize the sums
            let planSum = 0;
            let incomeSum = 0;
    
            let sum = {};
            for (let i = 1; i <= dates.length; i++) {
                sum[`day${i}`] = 0;
            }
            // Loop through the filtered items and calculate the sums
            filterdData.forEach((item) => {
                planSum += parseFloat(item["plan"]);
                for (let i = 1; i <= dates.length; i++) {
                    if (item[`day${i}`]) {
                        incomeSum += parseFloat(item[`day${i}`]);
                    }
                    sum[`day${i}`] += parseFloat(item[`day${i}`]);
                }
            });
    
            let result = {
                company: companyname + ' Company',
                plan: parseFloat(planSum.toFixed(2)),
                income: parseFloat(incomeSum.toFixed(2))
            };
            for (let i = 1; i <= dates.length; i++) {
                result[`day${i}`] = parseFloat(sum[`day${i}`].toFixed(2))
            }
    
            datas.push(result);
            // Group the data by the "team" field
            let groupedByTeam = filterdData.reduce((acc, obj) => {
                if (!acc[obj.team]) {
                    acc[obj.team] = {
                        plan: 0,
                        income: 0,
                        items: [],
                    };
                    for (let i = 1; i <= dates.length; i++) {
                        acc[obj.team][`day${i}`] = 0;
                    }
                }
                acc[obj.team].plan += parseFloat(obj.plan);
    
                for (let i = 1; i <= dates.length; i++) {
                    if (obj[`day${i}`]) {
                        acc[obj.team].income += parseFloat(obj[`day${i}`]);
                    }
                    acc[obj.team][`day${i}`] += parseFloat(obj[`day${i}`]);
                }
                acc[obj.team].items.push(obj);
                return acc;
            }, {});
            let keyNames = Object.keys(groupedByTeam);
            keyNames.forEach((key) => {
    
                let teamresult = {
                    teamshow: key+' Team',
                    plan: parseFloat(groupedByTeam[key]["plan"].toFixed(2)),
                    income: parseFloat(groupedByTeam[key]["income"].toFixed(2)),
                };
    
                for (let i = 1; i <= dates.length; i++) {
                    teamresult[`day${i}`] = parseFloat(groupedByTeam[key][`day${i}`].toFixed(2));
                }
                datas.push(teamresult);
    
                if (groupedByTeam[key].hasOwnProperty("items")) {
                    groupedByTeam[key].items.map((item) => {
                        item["income"] = 0;
                        for (let i = 1; i <= dates.length; i++) {
                            if (item[`day${i}`]) {
                                item["income"] += parseFloat(item[`day${i}`]);
                            }
                        }
                        datas.push(item);
                    });
                }
            });
        }
    }
    return datas;
}

export function updateArrays(datas, changedata) {
    datas.forEach((item, index) => {
        if (item.userID === changedata.userID) {
            datas[index] = { ...item, ...changedata };
        }
    });
    return datas;
}
