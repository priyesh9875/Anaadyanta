import React, { Component } from "react"
import {
    View,
    Text,
    Button,
    TouchableOpacity
} from "react-native"
const IconColor = '#4285f4'

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from "moment"
import { Icon } from "react-native-elements";

export default class CreatePDF extends Component {
    static config = {

    }

    constructor(props) {

        super(props)
        this.state = {
            creating: false,
            created: false,
            options: {
                html: "",
                fileName: this.props.eventDetails.title.replace(/\s+/g, '-').toLowerCase(),          /* Optional: Custom Filename excluded extension */
                directory: 'docs',         /* Optional: 'docs' will save the file in the `Documents` Default: Temp directory */
                base64: true,
                height: 800,
                width: 1056,
                padding: 24,
            }
        }

        this.convert = this.convert.bind(this)

    }

    coordinatorTable(coordinators) {
        let content = ""

        if (coordinators && coordinators.length > 0) {
            coordinators.map(val => {
                content += ` <tr>
                <td>${val.name}    </td>
                <td>${val.mobile || val.phone}</td>
                </tr>
            `
            })
        }
        return `
            <table >
            <thead> <tr>
                <th style="text-align:left">Name</th>
                <th style="text-align:left">Mobile/Phone</th>
                </tr> 
            </thead> 
            <tbody>
                ${content}
            </tbody>
            </table>
        `
    }

    generateImpDetails(eventDetails) {
        let dateTime = "Will be updated soon";
        if (eventDetails.startTime && (parseInt(eventDetails.startTime) > 1488911400)) {
            dateTime = ""
            dateTime += moment.unix(eventDetails.startTime).format("hh:mm a");
            if (eventDetails.endTime && eventDetails.endTime > eventDetails.startTime) {
                dateTime += moment.unix(eventDetails.endTime).format(" - hh:mm a")
            }
            dateTime += moment.unix(eventDetails.startTime).format(", ddd DD MMM YYYY");
        }
        let content = `
        <table >
            <tbody>
                <tr>
                    <th>Venue</th>
                    <td>${eventDetails.venue ? eventDetails.venue : "Will be updated soon"}</td>
                </tr>
                <tr>
                    <th>Schedule</th>
                    <td>${dateTime}</td>
                </tr>
                
                <tr>
                    <th>Registeration</th>
                    <td>${eventDetails.registration ? (isNaN(eventDetails.registration) ? eventDetails.registration : "Rs. " + eventDetails.registration) : "Will be updated soon"} </td>
                </tr>
                ${this.generatePrizesTableRow(eventDetails.prizes)}    
            </tbody>
            </table>

        `

        return content

    }

    generatePrizesTableRow(prizes) {
        let content = "<tr><th>Prizes</th> <td>Will be updated soon</td></tr>";
        if (prizes && prizes.length > 0) {
            content = "";
            prizes.map(prize => {
                content += `
                    <tr>
                    <th>Prize ${prize.position}</th>
                    <td>Rs. ${prize.amount} </td>
                </tr>
                    `
            })
        }
        return content
    }

    generateRulesSection(rules) {

        if (!rules || rules.length < 1) {
            return "<p>Will be updated soon</p>"
        }

        let content = ""

        rules.map(r => {
            if (r.isHeader) {
                content += `<p style="padding-top: 10px"><b>${r.name}</b></p>`
                if (r.hasSubItem) {
                    content += `<ul >`
                    content += this.generateSubContent(r.subContent)
                    content += `</ul><br/>`
                }
            }
        })


        return content
    }

    generateSubContent(rules) {
        if (!rules) return

        let content = ""
        if (rules && rules.length > 0) {
            rules.map(r => {
                if (r.description) {
                    content += `<li style="padding-top: 10px"><b>${r.name}</b></li><p>${r.description}</p>`
                } else {
                    if (r.hasSubItem) content += `<li style="padding-top: 10px"><b>${r.name}</b></li>`
                    else content += `<li>${r.name}</li>`
                }
                if (r.hasSubItem) {
                    content += `<ul>`
                    content += this.generateSubContent(r.subContent)
                    content += `</ul>`
                }
            })
        }
        return content
    }

    generateWinners(winners) {
        if (!winners || winners.length < 1) return

        let content = `
            <h3 style="color: #2e6c80;">Winners</h3>
            <table>

            `
        content += `
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Prize amount</th>
                    </tr>
                </thead>
                <tbody>
            `

        winners.map(winner => {
            content += `
                    <tr>
                        <td>${winner.position}</td>
                        <td>${winner.name}</td>
                        <td>${winner.amount}</td>
                    </tr>
                `
        })

        content += `
            </tbody>
            </table>
            <br/>
        `

        return content
    }

    parseEventDetails() {
        let {eventDetails } = this.props;

        let htmlString = `

            < style >
            td {
            padding: 3;
            padding - right: 25;
        },
        th {
            padding: 3;
            padding - right: 25;
        }

        </style >
            <h1 style="color: #5e9ca0; text-align: center; padding-bottom: 0px; margin-bottom: 10px; font-size: 50px;"><strong>Anaadyanta</strong></h1>
            <p style="text-align: center; padding-top: 0px; margin-top: 0px;">9, 10, 11 March 2017</p>
            <p>&nbsp;</p>

            <h1 style="color: #2e6c80;">${eventDetails.title}</h1>
            <p>${eventDetails.description || ""}</p>

            <br />
            ${this.generateImpDetails(eventDetails)}
            <br />
            ${this.generateWinners(eventDetails.winners)}


            <h3 style="color: #2e6c80;">Rules, Rounds and Regulations</h3>
            ${this.generateRulesSection(eventDetails.rules)}


        <h3 style="color: #2e6c80;">Coordinators/Contacts</h3>
        ${this.coordinatorTable(eventDetails.coordinators || eventDetails.coords)}
        <br />
            <br />

            <hr />
            <br />
            <p style="text-align:right; font-size:12; color:gray ">Generated on ${moment().format("hh:mm a  DD-MMM-YYYY")}</p>
            `

        return htmlString
    }


    convert(callback) {
        this.setState({
            creating: true
        }, () => {
            let options = { ...this.state.options }
            options.html = this.parseEventDetails()

            RNHTMLtoPDF.convert(options).then((data) => {
                if (typeof callback == 'function') {
                    callback()
                } else {
                    alert(`File saved in Documents/${options.fileName}.pdf`)
                }

                this.setState({
                    created: true,
                    creating: false
                })

            });
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.convert}>
                <Icon name="file-download" size={30} color={IconColor} />
                <Text style={{ fontSize: 15, alignSelf: "center" }}>{this.state.creating ? "Saving" : "PDF"}</Text>
            </TouchableOpacity>
        );
    }




}