
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    InteractionManager,
    NetInfo,
    Button

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import moment from "moment"

import Loading from "@components/general/Loading"
import { Container, Content, H1, H2, H3, Text, Card, CardItem, } from 'native-base';
import { firebaseApp } from '@config/firebase'


let events = [
    {
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

    },

    {
        "category": 1,
        "description": "To dance is to be free. If you can communicate without words, if you can make the crowd go crazy with your moves this is the place to be. This event welcomes colleges to showcase their talent across all styles and genres and captivate the audience!",
        "endTime": 1488443400,
        "id": 1,
        "image": "https://i.ytimg.com/vi/iExw1TD317o/maxresdefault.jpg",
        "isEnded": false,
        "isStarted": false,
        isGroup: true,
        "lastUpdated": 1484761696,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 150000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Time limit : 8+2 minutes" },
                    { name: "Number of participants: 12-30" },
                    { name: "Non-themed only" },
                    { name: "Any dance style canbe performed" },
                    { name: "The winners will be decided on the basis of choreography, coordination, costume, presentation." },
                    { name: "The team members could be current college students and alumni members." },
                ]
            },
            {
                name: "General rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each team member should possess a valid college ID proof." },
                    { name: "Each team will be given a time slot to perform which includes the time for stage setup on exceeding which the music will be stopped." },
                    { name: "In case of excess registration, an elimination round will be held. This will be intimated to the participants 3 days in advance." },
                    { name: "Dangerous props like inflammable or heavy objects are not allowed and no indecent behavior will be tolerated during the performance." },
                    { name: "The Participants could use props of their choice, all the props, costumes, music etc should be brought by the participants themselves." },
                    { name: "No extra lights or technical help will be provided during the performance. Teams should bring along people to manage sound and light if required." },
                    { name: "The team should submit their track in a CD/Flash Drive at least an hour prior to the event." },
                    { name: "The judge’s decision shall be final and there shall be no further debate." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Choreo night",
        "updatedBy": "Priyesh Kumar",
    },


    {
        "category": 1,
        "description": "Think less and feel more of the music. Pump your heart and let your dance do the talking. Show your rivals that this is your stage, and you are the ringmaster of this arena. Set the streets ablaze with your passion. Turn the opposition into a mere speck of dust as you weave your way through the patterns of space-time to rise above everyone else. Break free or die trying.",
        "endTime": 1488443400,
        "euid": "-KaXe73wJrFRW7KLcvSB",
        "id": 2,
        "image": "http://www.eastlondondance.org/wp-contents/uploads/2014/06/class_streetdance_04.jpg",
        "isEnded": false,
        "isGroup": true,
        "isStarted": false,
        "lastUpdated": 1484763739,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 4589,
        "rules": [
            {
                name: "Rounds", isHeader: true, hasSubItem: true,
                subContent: [
                    {
                        name: "Round 1", hasSubItem: true,
                        subContent: [
                            { name: "Group show off round" },
                            { name: "TIme limit : 4+1 minute" }
                        ],
                    },
                    {
                        name: "Round 2", hasSubItem: true,
                        subContent: [
                            { name: "Top 4 teams of round 1 will qualify" },
                            { name: "Individual face off round" }
                        ],
                    },
                    {
                        name: "Round 3", hasSubItem: true,
                        subContent: [
                            { name: "Top 3 teams of round 1 will qualify" },
                            { name: "Head to head face off" }
                        ],
                    },


                    { name: "Teams need to perform a dance sequence which must include element(s) from Hip-Hop, Popping, Break-dance, Stepping, Bboying, Contraptions and Western Freestyle." },
                ]
            },
            {
                name: "General rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each team member should possess a valid college ID proof." },
                    { name: "Each team will be given a time slot to perform which includes the time for stage setup on exceeding which the music will be stopped." },
                    { name: "In case of excess registration, an elimination round will be held. This will be intimated to the participants 3 days in advance." },
                    { name: "Dangerous props like inflammable or heavy objects are not allowed and no indecent behavior will be tolerated during the performance." },
                    { name: "The Participants could use props of their choice, all the props, costumes, music etc should be brought by the participants themselves." },
                    { name: "No extra lights or technical help will be provided during the performance. Teams should bring along people to manage sound and light if required." },
                    { name: "The team should submit their track in a CD/Flash Drive at least an hour prior to the event." },
                    { name: "The judge’s decision shall be final and there shall be no further debate." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Street Dance",
        "updatedBy": "Priyesh Kumar",
        "venue": "Main Ground",

    },



    {
        "category": 2,
        "endTime": 1488443400,
        description: "Play soccer and enjoy",
        "image": "http://www.footballfestivals.co.uk/wp-content/uploads/2015/09/5-a-side-youth-football.png",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484683111,
        isGroup: true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 5 on field + 3 substitutes" },
                    { name: "Rolling substitutes" },
                    { name: "10 minutes each half" },
                    { name: "In case of a draw,in mormal time ,match will be decided by penalty shoot-out(3 per team)" },
                    { name: "Goolkeeper is allowed to come out of the defence area and attack other's team coach" },
                    { name: "General rules of normal soccer apply" },
                    { name: "Referee decision will be final" },
                ]
            },

        ],
        "startTime": 1488436200,
        "title": "Mini Soccer",
        "updatedBy": "Priyesh Kumar"
    },
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Think you are taller than me? Prove me :)>",
        "image": "http://sports-961.com/wp-content/uploads/2014/07/3x3-Basketball-World-tour-Qualifiers-.jpg",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484819395,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 3 on field + 1 substitutes" },
                    { name: "Coin will be tossed for tossing?" },
                    { name: "The regular playing tume shall be a period of 6 minutes(3+1+3). How 6?" },
                    { name: "However, the first team who scores 21 points win the game even if it is before time" },
                    { name: "Substitutions can be done only when ball becomes dead. Ohhhh" },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "3v3 basketBall",
        "updatedBy": "Priyesh Kumarr"
    },
    {
        "category": 2,
        "description": "play counter strike and win exciting prizes like tank and Boeing 777",
        "endTime": 1488469020,
        "image": "http://images.g4tv.com/ImageDb3/308087_LGST/counter-strike-global-offensive.jpg",
        "isEnded": false,
        "isGroup": false,
        "isStarted": false,
        "lastUpdated": 1484829604,
        "prizes": [{
            "amount": 500000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 5 per team" },
                    { name: "Knockout tournament" },
                    { name: "WCG rules are valid" },
                    { name: "D3/AUI or KRIEG 550 COMMANDO is not allowed" },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },
                    { name: "e_dust 2, De_inferno, de_nuke (maps). What?" },
                ]
            },
        ],
        "registeration": 99,
        "startTime": 1488458220,
        "title": "Counter Strike 1.6",
        "updatedBy": "Priyesh Kumarr",
    },
    {
        "category": 2,
        "endTime": 1488443400,
        "euid": "-KaXe8lHDZO-tJ0IP1Ja",
        "image": "https://i.ytimg.com/vi/-hjwn5A5424/maxresdefault.jpg",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484591460,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 5 per team" },
                    { name: "Map version IS 6.81C" },
                    { name: "WCG(World Cyber Gaming) rules are valid" },
                    { name: "D3/AUI or KRIEG 550 COMMANDO is not allowed" },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "DOTA 2",
        "updatedBy": "Priyesh Kumar"
    },
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Drive through the valley busting pulices and your friends. Show them what they are, not what you are.",
        "image": "https://i.ytimg.com/vi/eZTup0qxUfQ/maxresdefault.jpg",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484688953,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual event" },
                    { name: "Knockout tournament" },
                    { name: "WCG(World Cyber Gaming) rules are valid" },
                    { name: "Sprint races" },
                    { name: "Bonus cars will be allowed" },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },

                ]
            },
        ],
        "startTime": 1488436200,
        "title": "NFS Most Wanted",
        "updatedBy": "Priyesh Kumar",
    },
    {
        "category": 3,
        "endTime": 1488443400,
        description: "Design and construct a remote controlled robot capable of fighting a one on one tournament",
        "image": "http://www.highreshdwallpapers.com/wp-content/uploads/2015/01/Battle-of-the-Robots-1920x1080.jpg",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484926878,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        rules: [
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
                            { name: `Non-wheeled robots having no rolling elements in contact with the floor and no continuous rolling or cam operated motion in contact with the floor, either directly or via a linkage. Motion is "continuous" if continuous operation of the drive motor(s) produces continuous motion of the robot. Linear-actuated legs and novel non-wheeled drive systems come under this category.` },
                            { name: `Flying (using airfoil, helium balloons, ornithopters, etc.) is not allowed.` },
                        ]
                    }, {
                        name: "Robot Control Requirements", hasSubItem: true,
                        subContent: [
                            { name: "The machine can be controlled through wireless remote only. Power supply should be on board only. Refer below for further details on battery and power." },
                            { name: "There should be binding capability between transmitters and receivers. The remote with such facility will only be allowed." },
                            { name: `The team must have at least four frequency wireless remote control circuit or two dual control circuits which may be interchanged before the start of the race to avoid frequency interference with other teams. The case of any interference in the wireless systems will not be considered for rematch or results.` },
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
        ],
        "startTime": 1488436200,
        "title": "RoboWars",
        "updatedBy": "RajNarayan Dutta"
    },
    {
        "category": 3,
        "endTime": 1488443400,
        description: "A solar powered boat race. Fight against high tides like jack sparrow",
        "image": "http://www.classic-sailing.co.uk/sites/default/files/media/Vessels/Europa/605_395263027202718_1581462115_n.jpg",
        "isEnded": false,
        "isStarted": false,
        "lastUpdated": 1484823175,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Battery: 6V. Solar powered right? LoL" },
                    { name: "Motor: 6V DC" },
                    { name: "Solar panel for show off" },
                    { name: "Dimensions: 20 cm X 15 cm X 10 cm" },
                ]
            },
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual event" },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Jahazz",
        "updatedBy": "Priyesh Kumarr"
    },

    {
        "category": 3,
        "description": "Challenge you programming skill's",
        "endTime": 1488443400,
        description: "A contest to quench your coding thirst. We provide an opportunity to test your coding skills but not in the stereotypical way. We mean “on the spot” when we say “on the spot",
        "image": "http://static4.businessinsider.com/image/5666fab484307658008b8371/if-youre-new-to-coding-this-is-the-programming-language-you-should-learn-first.jpg",
        "isEnded": false,
        "isGroup": false,
        "isStarted": false,
        "lastUpdated": 1484931015,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "rules": [
            {
                name: "Rounds", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A simple test to test your proficiency in C skills. 4 teams will be shortlisted and selected to the second round" },
                    { name: "A surprise awaits. Something new welcomes you. You are given just a simple word to be coded and displayed on your screens." },
                ]
            },
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of participants: Max 2." },
                    { name: "The first round will be paper-pen oriented. The second puts you on the computer." },
                    { name: "Winners will be announced based on the time taken to code a particular assignment" },
                ]
            },
        ],
        "registeration": 4589,
        "startTime": 1488436200,
        "title": "OnSpot Programming",
        "updatedBy": "RajNarayan Dutta",
        "venue": "CS lab 15",

    }

]


class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            tempEvents: {},
            message: "loading",
        };

        this.upload = this.upload.bind(this)

    }

    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {

            this.setState({
                loading: false,
                tempEvents: events,
                message: "ready"
            })
        })
    }

    upload(e) {



        firebaseApp.auth().onAuthStateChanged((user) => {

            this.setState({
                message: "working"
            })
            if (user) {
                const newPostKey = firebaseApp.database().ref().child('events').push().key
                const postData = {
                    ...e,
                    euid: newPostKey,
                    lastUpdated: moment().unix(),
                    startTime: moment("2017-03-02 12:00", "YYYY-MM-DD h:m").unix(),
                    endTime: moment("2017-03-02 14:00", "YYYY-MM-DD h:m").unix(),
                    length: 2,
                    prizes: [
                        { position: 1, amount: 10000 },
                        { position: 2, amount: 1000 },
                    ],
                }


                const uid = firebaseApp.auth().currentUser.uid;
                let updates = {}
                updates['/events/' + newPostKey] = postData

                firebaseApp.database().ref().update(updates).then((res) => {
                    this.setState({
                        message: "done"
                    })

                }).catch((err) => {
                    alert(JSON.stringify(err))

                })
            } else {
                alert("Un authorized")
            }
        })


    }



    render() {
        const { name } = this.props.currentUser
        const mainView = <Container>
            <Content>

                <Text>{this.state.message}</Text>
                {
                    Object.keys(events).map((val, index) => {
                        const e = events[val]
                        return <View key={val} style={{ padding: 5, flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={{ flex: 1 }} onPress={() => { this.upload(e) } }>{e.title} </Text>
                        </View>
                    })
                }


            </Content>
        </Container>
        return (
            this.state.loading ? <Loading /> : mainView
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileInfoContainer: {
        flexDirection: 'row',
        height: 65,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: '#4285f4'
    },
    profileNameContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    profileName: {
        marginLeft: 20,
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: '#ffffff',
    },
    menuContainer: {
        padding: 5,
        margin: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4285f4',
        flexDirection: "row",
        borderRadius: 5,
        marginLeft: 12,
        marginRight: 12,
    },
    menuText: {
        flex: 1,
        padding: 10,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: "black"
    },
    menuArrow: {
        fontSize: 30,
        paddingTop: 2,
        paddingRight: 10,
        fontFamily: 'Roboto-Bold'

    },
    profileCountsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    profileCounts: {
        fontFamily: 'Roboto-Regular',
        fontSize: 30,
        color: '#ffffff'
    },
    countsName: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        color: '#ffffff'
    }
})

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(AddEvent);

