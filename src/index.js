import Court from './court';
import Shots from './shots';
import Widgets from './widgets';

const CONSTANTS = {
    courtWidth: 500,
    courtHeight: 470,
}

document.addEventListener("DOMContentLoaded", () => {
    draw("Jimmy Butler");

    const searchfield = document.querySelector("input");

    searchfield.oninput = (text) => {
        text.target.value === "" ? clearPlayerMenuResults() : playerMenu(text.target.value);
    };
});

function draw(playerName) {
    let svg = d3.select("#svgcontainer")
        .append("svg").attr("width", CONSTANTS.courtWidth).attr("height", CONSTANTS.courtHeight);

    const court = new Court(svg);
    court.render();

    const shots = new Shots(svg, playerName);
}

function clearPlayerMenuResults(){
    d3.selectAll(".searchresults li")
        .remove();
}

function playerMenu(searchText) {
    clearPlayerMenuResults();

    d3.csv("../dataset/dataset.csv")
        .then(function (data) {
            const searchLength = searchText.length;
            let players = []
            //set structure
            data.forEach(player => {
                // trim name (for spaces)
                if ( player.name.slice(0, searchLength).toLowerCase() === searchText.toLowerCase() 
                    && players.length <= 6 && !players.includes(player.name) ) {
                    d3.select(".searchresults")
                        .append("li")
                        .attr("class", "playeroption")
                        .on("click", () => {
                            console.log("potato")
                        })
                        .text(player.name) 

                    players.push(player.name);
                }
            });
        });
}


    // d3.csv("../dataset/nba_savant.csv")
    //     .then(function (data) {
    //         const selector = d3.select("body")
    //             .append("select")
    //             .attr("id", "playerSelector")
    //             .selectAll("option")
    //             .data(data)
    //             .enter().append("option")
    //             .text(function (d) { return d.name; })
    //             .attr("value", function (d, i) {
    //                 return i;
    //             });
    //     })
            
    //         let i = Math.round(Math.random() * data.length);
    //         d3.select("#playerSelector").property("selectedIndex", i);

    //         d3.select("body")
    //             .append("p")
    //             .data(data)
    //             .text(function (d) {
    //                 return data[i]['team_name'];
    //             })

    //         d3.select("#playerSelector")
    //             .on("change", function (d) {
    //                 i = this.value;
    //                 update();
    //             })
            
    //         function update() {
    //             d3.selectAll("p")
    //                 .data(data)
    //                 .text(function (d) {
    //                     return data[i]['team_name'];
    //                 })
    //         }
        // })
// }