export function rearrangeData(importdatas, dates) {
    if(importdatas.length==0){
        return [];
    }
    // Company 
    let datas = [];
    let companies = ['3*9', '5*4', '8*2'];
    // let header = {
    //     // 'company':"Company",
    //     // 'teamshow':"Team",
    //     // 'name':"Name",
    //     // 'plan':"Plan",
    //     // 'earning':"Earning",
    //     'day1': dates[0],
    //     'day2': dates[1],
    //     'day3': dates[2],
    //     'day4': dates[3],
    //     'day5': dates[4],
    //     'day6': dates[5],
    //     'day7': dates[6],
    //     'day8': dates[7],
    //     'day9': dates[8],
    //     'day10': dates[9],
    //     'day11': dates[10],
    //     'day12': dates[11],
    //     'day13': dates[12],
    //     'day14': dates[13],
    //     'day15': dates[14],
    //     'day16': dates[15],
    //     'day17': dates[16],
    //     'day18': dates[17],
    //     'day19': dates[18],
    //     'day20': dates[19],
    //     'day21': dates[20],
    //     'day22': dates[21],
    //     'day23': dates[22],
    //     'day24': dates[23],
    //     'day25': dates[24],
    //     'day26': dates[25],
    //     'day27': dates[26],
    //     'day28': dates[27],
    //     'day29': dates[28],
    //     'day30': dates[29],
    //     'day31': dates[30],
    //     'day32': dates[31],
    //     'day33': dates[32],
    //     'day34': dates[33],
    //     'day35': dates[34],
    // }
    // datas.push(header);
    for (let companyname of companies) {
        let filterdData = importdatas.filter(
            (obj) => obj.organization === companyname
        );
        // Initialize the sums
        let planSum = 0;
        let earningSum = 0;
        let day1Sum = 0;
        let day2Sum = 0;
        let day3Sum = 0;
        let day4Sum = 0;
        let day5Sum = 0;
        let day6Sum = 0;
        let day7Sum = 0;
        let day8Sum = 0;
        let day9Sum = 0;
        let day10Sum = 0;
        let day11Sum = 0;
        let day12Sum = 0;
        let day13Sum = 0;
        let day14Sum = 0;
        let day15Sum = 0;
        let day16Sum = 0;
        let day17Sum = 0;
        let day18Sum = 0;
        let day19Sum = 0;
        let day20Sum = 0;
        let day21Sum = 0;
        let day22Sum = 0;
        let day23Sum = 0;
        let day24Sum = 0;
        let day25Sum = 0;
        let day26Sum = 0;
        let day27Sum = 0;
        let day28Sum = 0;
        let day29Sum = 0;
        let day30Sum = 0;
        let day31Sum = 0;
        let day32Sum = 0;
        let day33Sum = 0;
        let day34Sum = 0;
        let day35Sum = 0;

        // Loop through the filtered items and calculate the sums
        filterdData.forEach((item) => {
            planSum += parseFloat(item["plan"]);

            for (let i = 1; i <= 35; i++) {
                if (item[`day${i}`]) {
                    earningSum += parseFloat(item[`day${i}`]);
                }
            }
            day1Sum += parseFloat(item["day1"]);
            day2Sum += parseFloat(item["day2"]);
            day3Sum += parseFloat(item["day3"]);
            day4Sum += parseFloat(item["day4"]);
            day5Sum += parseFloat(item["day5"]);
            day6Sum += parseFloat(item["day6"]);
            day7Sum += parseFloat(item["day7"]);
            day8Sum += parseFloat(item["day8"]);
            day9Sum += parseFloat(item["day9"]);
            day10Sum += parseFloat(item["day10"]);
            day11Sum += parseFloat(item["day11"]);
            day12Sum += parseFloat(item["day12"]);
            day13Sum += parseFloat(item["day13"]);
            day14Sum += parseFloat(item["day14"]);
            day15Sum += parseFloat(item["day15"]);
            day16Sum += parseFloat(item["day16"]);
            day17Sum += parseFloat(item["day17"]);
            day18Sum += parseFloat(item["day18"]);
            day19Sum += parseFloat(item["day19"]);
            day20Sum += parseFloat(item["day20"]);
            day21Sum += parseFloat(item["day21"]);
            day22Sum += parseFloat(item["day22"]);
            day23Sum += parseFloat(item["day23"]);
            day24Sum += parseFloat(item["day24"]);
            day25Sum += parseFloat(item["day25"]);
            day26Sum += parseFloat(item["day26"]);
            day27Sum += parseFloat(item["day27"]);
            day28Sum += parseFloat(item["day28"]);
            day29Sum += parseFloat(item["day29"]);
            day30Sum += parseFloat(item["day30"]);
            day31Sum += parseFloat(item["day31"]);
            day32Sum += parseFloat(item["day32"]);
            day33Sum += parseFloat(item["day33"]);
            day34Sum += parseFloat(item["day34"]);
            day35Sum += parseFloat(item["day35"]);
        });

        let result = {
            company: companyname,
            plan: planSum,
            earning: earningSum,
            day1: day1Sum,
            day2: day2Sum,
            day3: day3Sum,
            day4: day4Sum,
            day5: day5Sum,
            day6: day6Sum,
            day7: day7Sum,
            day8: day8Sum,
            day9: day9Sum,
            day10: day10Sum,
            day11: day11Sum,
            day12: day12Sum,
            day13: day13Sum,
            day14: day14Sum,
            day15: day15Sum,
            day16: day16Sum,
            day17: day17Sum,
            day18: day18Sum,
            day19: day19Sum,
            day20: day20Sum,
            day21: day21Sum,
            day22: day22Sum,
            day23: day23Sum,
            day24: day24Sum,
            day25: day25Sum,
            day26: day26Sum,
            day27: day27Sum,
            day28: day28Sum,
            day29: day29Sum,
            day30: day30Sum,
            day31: day31Sum,
            day32: day32Sum,
            day33: day33Sum,
            day34: day34Sum,
            day35: day35Sum,
        };
        datas.push(result);
        // Group the data by the "team" field
        let groupedByTeam = filterdData.reduce((acc, obj) => {
            if (!acc[obj.team]) {
                acc[obj.team] = {
                    plan: 0,
                    earning: 0,
                    day1: 0,
                    day2: 0,
                    day3: 0,
                    day4: 0,
                    day5: 0,
                    day6: 0,
                    day7: 0,
                    day8: 0,
                    day9: 0,
                    day10: 0,
                    day11: 0,
                    day12: 0,
                    day13: 0,
                    day14: 0,
                    day15: 0,
                    day16: 0,
                    day17: 0,
                    day18: 0,
                    day19: 0,
                    day20: 0,
                    day21: 0,
                    day22: 0,
                    day23: 0,
                    day24: 0,
                    day25: 0,
                    day26: 0,
                    day27: 0,
                    day28: 0,
                    day29: 0,
                    day30: 0,
                    day31: 0,
                    day32: 0,
                    day33: 0,
                    day34: 0,
                    day35: 0,
                    items: [],
                };
            }
            acc[obj.team].plan += parseFloat(obj.plan);

            for (let i = 1; i <= 35; i++) {
                if (obj[`day${i}`]) {
                    acc[obj.team].earning += parseFloat(obj[`day${i}`]);
                }
            }

            acc[obj.team].day1 += parseFloat(obj.day1);
            acc[obj.team].day2 += parseFloat(obj.day2);
            acc[obj.team].day3 += parseFloat(obj.day3);
            acc[obj.team].day4 += parseFloat(obj.day4);
            acc[obj.team].day5 += parseFloat(obj.day5);
            acc[obj.team].day6 += parseFloat(obj.day6);
            acc[obj.team].day7 += parseFloat(obj.day7);
            acc[obj.team].day8 += parseFloat(obj.day8);
            acc[obj.team].day9 += parseFloat(obj.day9);
            acc[obj.team].day10 += parseFloat(obj.day10);
            acc[obj.team].day11 += parseFloat(obj.day11);
            acc[obj.team].day12 += parseFloat(obj.day12);
            acc[obj.team].day13 += parseFloat(obj.day13);
            acc[obj.team].day14 += parseFloat(obj.day14);
            acc[obj.team].day15 += parseFloat(obj.day15);
            acc[obj.team].day16 += parseFloat(obj.day16);
            acc[obj.team].day17 += parseFloat(obj.day17);
            acc[obj.team].day18 += parseFloat(obj.day18);
            acc[obj.team].day19 += parseFloat(obj.day19);
            acc[obj.team].day20 += parseFloat(obj.day20);
            acc[obj.team].day21 += parseFloat(obj.day21);
            acc[obj.team].day22 += parseFloat(obj.day22);
            acc[obj.team].day23 += parseFloat(obj.day23);
            acc[obj.team].day24 += parseFloat(obj.day24);
            acc[obj.team].day25 += parseFloat(obj.day25);
            acc[obj.team].day26 += parseFloat(obj.day26);
            acc[obj.team].day27 += parseFloat(obj.day27);
            acc[obj.team].day28 += parseFloat(obj.day28);
            acc[obj.team].day29 += parseFloat(obj.day29);
            acc[obj.team].day30 += parseFloat(obj.day30);
            acc[obj.team].day31 += parseFloat(obj.day31);
            acc[obj.team].day32 += parseFloat(obj.day32);
            acc[obj.team].day33 += parseFloat(obj.day33);
            acc[obj.team].day34 += parseFloat(obj.day34);
            acc[obj.team].day35 += parseFloat(obj.day35);
            acc[obj.team].items.push(obj);
            return acc;
        }, {});
        let keyNames = Object.keys(groupedByTeam);
        keyNames.forEach((key) => {
            datas.push({
                teamshow: key,
                plan: groupedByTeam[key]["plan"],
                earning: groupedByTeam[key]["earning"],
                day1: groupedByTeam[key]["day1"],
                day2: groupedByTeam[key].day2,
                day3: groupedByTeam[key].day3,
                day4: groupedByTeam[key].day4,
                day5: groupedByTeam[key].day5,
                day6: groupedByTeam[key].day6,
                day7: groupedByTeam[key].day7,
                day8: groupedByTeam[key].day8,
                day9: groupedByTeam[key].day9,
                day10: groupedByTeam[key].day10,
                day11: groupedByTeam[key].day11,
                day12: groupedByTeam[key].day12,
                day13: groupedByTeam[key].day13,
                day14: groupedByTeam[key].day14,
                day15: groupedByTeam[key].day15,
                day16: groupedByTeam[key].day16,
                day17: groupedByTeam[key].day17,
                day18: groupedByTeam[key].day18,
                day19: groupedByTeam[key].day19,
                day20: groupedByTeam[key].day20,
                day21: groupedByTeam[key].day21,
                day22: groupedByTeam[key].day22,
                day23: groupedByTeam[key].day23,
                day24: groupedByTeam[key].day24,
                day25: groupedByTeam[key].day25,
                day26: groupedByTeam[key].day26,
                day27: groupedByTeam[key].day27,
                day28: groupedByTeam[key].day28,
                day29: groupedByTeam[key].day29,
                day30: groupedByTeam[key].day30,
                day31: groupedByTeam[key].day31,
                day32: groupedByTeam[key].day32,
                day33: groupedByTeam[key].day33,
                day34: groupedByTeam[key].day34,
                day35: groupedByTeam[key].day35,
            });

            if (groupedByTeam[key].hasOwnProperty("items")) {
                groupedByTeam[key].items.map((item) => {
                    item["earning"] = 0;
                    for (let i = 1; i <= 35; i++) {
                        if (item[`day${i}`]) {
                            item["earning"] += parseFloat(item[`day${i}`]);
                        }
                    }
                    datas.push(item);
                });
            }
        });
    }
    return datas;
}

export function updateArrays (datas, changedata) {
    datas.forEach((item, index) => {
        if (item._id === changedata._id) {
            datas[index] = { ...item, ...changedata };
        }
    });
    return datas;
}