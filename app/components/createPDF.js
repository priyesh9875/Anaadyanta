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
                html: this.parseEventDetails(),
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
        let content = `
        <table >
            <tbody>
                <tr>
                    <th>Venue</th>
                    <td>${eventDetails.venue || "Yet to be finalized"} </td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${moment.unix(eventDetails.startTime).format("DD MMM YYYY") || "Yet to be decided"}</td>
                </tr>
                <tr>
                    <th>Time</th>
                    <td>${moment.unix(eventDetails.startTime).format("hh:mm a") || "Yet to be decided"} - ${moment.unix(eventDetails.endTime).format("hh:mm a") || "Yet to be decided"} </td>
                </tr>
                <tr>
                    <th>Registeration fees</th>
                    <td>Rs. ${eventDetails.registeration || "Yet to be decided"} </td>
                </tr>
                ${this.generatePrizesTableRow(eventDetails.prizes)}    
            </tbody>
            </table>

        `

        return content

    }

    generatePrizesTableRow(prizes) {
        let content = "";
        if (prizes && prizes.length > 0) {
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
            return "<p>Yet to be decided</p>"
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

        if (winners[0].name) {
            content += `
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>College</th>
                        <th>Prize amount</th>
                    </tr>
                </thead>
                <tbody>
            `
        } else {
            content += `
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>College</th>
                        <th>Prize amount</th>
                    </tr>
                </thead>
                <tbody>                
            `
        }


        winners.map(winner => {
            if (winner.name) {
                content += `
                    <tr>
                        <td>${winner.position}</td>
                        <td>${winner.name}</td>
                        <td>${winner.college}</td>
                        <td>${winner.amount}</td>
                    </tr>
                `
            } else {
                content += `
                    <tr>
                        <td>${winner.position}</td>
                        <td>${winner.college}</td>
                        <td>${winner.amount}</td>
                    </tr>
                `
            }
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
        if (!eventDetails) eventDetails = {
            category: 3,
            "description": "There will be isometric view of a dis-assembled model as well as assembled model is given in a sheet, the participants  need to crate the part and assembles it and take the draft of it with the help of CATIA or PRO-E",
            "endTime": 1488443400,
            "id": 0,
            "image": "http://www.cmw.net.au/images/project/Manufacturing_BluescopeSteel_Web_2.jpg",
            "isEnded": false,
            "isGroup": true,
            "isStarted": false,
            "prizes": [{
                "amount": 10000,
                "position": 1
            }, {
                "amount": 1000,
                "position": 2
            }],
            "registeration": 1506,
            "rules": [
                {
                    name: "Rules", isHeader: true, hasSubItem: true,
                    subContent: [
                        { name: "Time limit : 90 minutes" },
                        { name: "Number of people: Max 2" },
                    ]
                },
                {
                    name: "Judgement", isHeader: true, hasSubItem: true, description: "Judgment is based on the following factors",
                    subContent: [
                        { name: "Mass properties and the accuracy of the individual part models." },
                        { name: "Distance and angle checking of the assembly." },
                        { name: "Exactness of Dimensions." },
                        { name: "Constraints given while assembling." },
                        { name: "Time taken to finish." },
                        { name: "Professional layout and presentation of the assembly drawing on a sheet of paper." },
                    ]
                },
            ],

            "startTime": 1488436200,
            "title": "Draft it out",
            "venue": "Back parking",

        }
        let rules = [
            {
                name: "Specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    {
                        name: "Dimensions and Fabrications", hasSubItem: true,
                        subContent: [
                            { name: "The machine should fit in a box of dimension 800mm x 800mm x 1000 mm (l x b x h) at any given point during the match. The external device used to control the machine or any external tank is not included in the size constraint." },
                            { name: "The machine should not exceed 60 kg of weight including the weight of pneumatic source/tank. All pneumatic tanks/source and batteries should be onboard. Weight of remote controller will not be counted." }
                        ]
                    },
                    {
                        name: "Mobility", hasSubItem: true,
                        subContent: [
                            { name: "All robots must have easily visible and controlled mobility in order to compete. They includes following" },
                            { name: "Rolling (wheels, tracks or the whole robot)." },
                            { name: `Non-wheeled robots having no rolling elements in contact with the floor and no continuous rolling or cam operated motion in contact with the floor, either directly or via a linkage.Motion is "continuous" if continuous operation of the drive motor(s) produces continuous motion of the robot.Linear - actuated legs and novel non- wheeled drive systems come under this category.` },
                            { name: `Flying (using airfoil, helium balloons, ornithopters, etc.) is not allowed.` },
                        ]
                    }, {
                        name: "Robot Control Requirements", hasSubItem: true,
                        subContent: [
                            { name: "The machine can be controlled through wireless remote only. Power supply should be on board only. Refer below for further details on battery and power." },
                            { name: "There should be binding capability between transmitters and receivers. The remote with such facility will only be allowed." },
                            { name: `The team must have at least four frequency wireless remote control circuit or two dual control circuits which may be interchanged before the start of the race to avoid frequency interference with other teams.The case of any interference in the wireless systems will not be considered for rematch or results.` },
                        ]
                    },
                    {
                        name: "Battery and Power", hasSubItem: true,
                        subContent: [
                            { name: "The machine can be powered electrically only. Use of an IC engine in any form is not allowed. On board batteries must be sealed, immobilized-electrolyte types (such as gel cells, lithium, NiCad, NiMH, or dry cells)." },
                            { name: "The electric voltage between 2 points anywhere in the machine should not be more than 36V DC at any point of time." },
                        ]
                    },
                    {
                        name: "Pneumatics", hasSubItem: true,
                        subContent: [
                            { name: "Robot can use pressurized non-inflammable gases to actuate pneumatic devices. Maximum allowed outlet nozzle pressure is 10 bar. The storage tank and pressure regulators used by teams need to be certified and teams using pneumatics are required to produce the Safety and Security letters at the Registration Desk at the venue. Failing to do so will lead to direct disqualification." },
                            { name: "All hydraulic components on-board must be securely mounted. Special care must be taken while mounting pump, accumulator and armor to ensure that if ruptured direct fluid streams will not escape the robot." },
                        ]
                    }, {
                        name: "Hydraulics", hasSubItem: true,
                        subContent: [
                            { name: "Robot can use non-inflammable liquid to actuate hydraulic devices e.g. cylinders." },
                            { name: "The electric voltage between 2 points anywhere in the machine should not be more than 36V DC at any point of time." },
                        ]
                    }, {
                        name: "Weapons system", hasSubItem: true, description: "Robots can have any kind of magnetic weapons, cutters, flippers, saws, lifting devices, spinning hammers etc. as weapons with following exceptions and limitations:",
                        subContent: [
                            { name: "Liquid projectiles." },
                            { name: "Any kind of inflammable liquid." },
                            { name: "Flame-based weapons." },
                        ]
                    },

                ]
            },

            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    {
                        name: "Video and Abstract Submission", description: "Participants have to submit a portfolio of their machine, consisting of a written abstract and a video of the working model before the competition. This portfolio will be used to seed teams for the competition. Only the shortlisted teams will be eligible to participate in 'Robowars' at Geek Mayhem, Anaadyanta 2015. The teams can do an online submission, mailing us the soft copy of abstract (PDF format) and a video of your robot at nitte.tech@gmail.comwith subject Robowars. Offline submissions won't be entertained. Last date for portfolio submission is 19th February 2015.",
                    },
                    {
                        name: "Abstract", hasSubItem: true, description: "The written abstract should be prepared on the following lines:",
                        subContent: [
                            { name: "The weapon systems and power supply method should be explained in detail, along with proper diagrams. Picture(s) showing these should be attached." },
                            { name: "Rolling (wheels, tracks or the whole robot)." },
                        ]
                    },
                    {
                        name: "Video Abstract", hasSubItem: true,
                        subContent: [
                            { name: "The video should be of at least 1 minute with the unedited clip showing the machine performance to the fullest. All destructive mechanism(s) being used must be shown working." },
                            { name: "All submission must be made online before the deadline." },
                        ]
                    },


                ]
            },

            {
                name: "Criteria for Victory", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A robot is declared victorious if its opponent is immobilized." },
                    { name: "A robot will be declared immobile if it cannot display linear motion of at least one inch in a timed period of 30 seconds. A bot with one side of its drivetrain disabled will not be counted out if it can demonstrate some degree of controlled movement. In case both the robots remain mobile after the end of the round then the winner will be decided subjectively." },
                    { name: "A robot that is deemed unsafe by the judges after the match has begun will be disqualified and therefore declared the loser. The match will be immediately halted and the opponent will be awarded a win." },
                    { name: "If a robot is thrown out of the arena the match will stop immediately, and the robot still inside the arena will automatically be declared as the winner." },
                ]
            },

            {
                name: "Safety Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Special care should be taken to protect the on-board batteries and pneumatics, robot without proper protection will not be allowed to compete." },
                    { name: "If you have a robot or weapon design that does not fit within the categories set forth in these rules or is in some way ambiguous or borderline, please contact the event organizers. Safe innovation is always encouraged, but surprising the organizers with your brilliant exploitation of a loophole may cause your robot to be disqualified before it even competes." },
                ]
            },
            {
                name: "Team Specification", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Any team can participate in Robowars, Geek Mayhem, Anaadyanta 2015. A team may consist of a maximum of 6 participants." },
                    { name: "These participants can be from same or different institutes." },
                    { name: "Team Name: Every team must have a name which must be unique. Geek Mayhem, Anaadyanta reserves the right to reject entries from any Team whose name it deems inappropriate, offensive or conflicting. Organizers must be notified during if a Team's name has been changed." },
                ]
            },
            {
                name: "Event specific Terminologies", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Disabled", description: "A robot is not functioning correctly due to either an internal malfunction, or contact with the opposing robot or Arena Hazard." },
                    { name: "Disqualification", description: "A Robot is no longer permitted to compete in the current Robowars Tournament." },
                    { name: "Immobilized", description: "In Judge's opinion, a robot is not responsive for a specified period of time." },
                    { name: "Knockout", description: "Occurs when the attack or deliberate actions of one robot causes its opponent to become immobilized." },
                    { name: "Pinning", description: "Occurs when one robot, through sheer force, holds an opponent stationary in order to immobilize it." },
                ]
            },
        ]

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
            <p style="text-align: center; padding-top: 0px; margin-top: 0px;">2, 3 and 4 March 2017</p>
            <p>&nbsp;</p>

            <h1 style="color: #2e6c80;">${eventDetails.title}</h1>
            <p>${eventDetails.description || "Please tell me about this event in more precise english or hindi word coz you are lazy to give me description. ".repeat(4)}</p>

            <br />
            ${this.generateImpDetails(eventDetails)}
            <br />
            ${this.generateWinners(eventDetails.winners)}


            <h3 style="color: #2e6c80;">Rules, Rounds and Regulations</h3>
            ${this.generateRulesSection(eventDetails.rules)}


        <h3 style="color: #2e6c80;">Coordinators/Contacts</h3>
        ${this.coordinatorTable(eventDetails.coordinators)}
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
        })
        RNHTMLtoPDF.convert(this.state.options).then((data) => {
            if (typeof callback == 'function') {
                callback()
            } else {
                alert(`File saved at / Documents / ${this.state.options.fileName}.pdf`)
            }

            this.setState({
                created: true,
                creating: false
            })

        });
    }

    render() {
        return (
            <TouchableOpacity onPress={this.convert}>
                <Icon name="file-download" size={30} color={IconColor} />
                <Text style={{ fontSize: 15 }}>{this.state.creating ? "Saving" : "Save"}</Text>
            </TouchableOpacity>
        );
    }




}