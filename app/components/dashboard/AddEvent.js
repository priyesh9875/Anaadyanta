
import React, { Component } from 'react';
import {
    View,
    Image,
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



    /// cultural starts
    // Choreo nite (Western)
    {
        "category": 1,
        "description": "Dance is the hidden language of the soul - Martha Graham. If you've got what it takes to narrate a story with just your body, to get all those around you to their feet, this is your chance to put that talent to the test. So pick up your dancing shoes and get ready for the biggest night of your lives.",
        "endTime": 1488443400,
        "image": "https://wwlyna.files.wordpress.com/2010/09/mari_keone1.jpg",
        "coords": [
            { name: "Prerana Permanand", phone: "+91 9972995418" },
            { name: "Anusha HP", phone: "+91 9686991686" },
        ],
        isGroup: true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 18000,
            "position": 2
        }],
        "registration": 2500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "This is a Non-Theme (Strictly western) competition." },
                    { name: "Each team will be given a time slot of 8+2 minutes to perform which includes the time taken for stage set up. Music will be stopped exactly after 8 minutes." },
                    { name: "Minimum number of participants per team is 8. Maximum number of participants per team is 30 plus backstage helpers." },
                    { name: "All team members must carry their college ID cards with them till the completion of the event." },
                    { name: "Inflammable objects, water and hazardous objects are NOT allowed on stage. No indecent behavior will be tolerated during the performance." },
                    { name: "Any team which fails to perform during their allotted slot will be disqualified and no other alternate slots will be given." },
                    { name: "Judges and coordinators' decisions shall be final and binding. There shall be no arguments in this regard." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Choreo night (Western)",
    },

    // Choreo nite  (Eastern)
    {
        "category": 1,
        "description": "Dance is the hidden language of the soul - Martha Graham. If you've got what it takes to narrate a story with just your body, to get all those around you to their feet, this is your chance to put that talent to the test. So pick up your dancing shoes and get ready for the biggest night of your lives.",
        "endTime": 1488443400,
        "image": "https://wwlyna.files.wordpress.com/2010/09/mari_keone1.jpg",
        "coords": [
            { name: "Prerana Permanand", phone: "+91 9972995418" },
            { name: "Anusha HP", phone: "+91 9686991686" },
        ],
        isGroup: true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 2000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "This is a Non-Theme (Strictly eastern) competition." },
                    { name: "Each team will be given a time slot of 8+2 minutes to perform which includes the time taken for stage set up. Music will be stopped exactly after 8 minutes." },
                    { name: "Minimum number of participants per team is 8. Maximum number of participants per team is 30 plus backstage helpers." },
                    { name: "All team members must carry their college ID cards with them till the completion of the event." },
                    { name: "Inflammable objects, water and hazardous objects are NOT allowed on stage. No indecent behavior will be tolerated during the performance." },
                    { name: "Any team which fails to perform during their allotted slot will be disqualified and no other alternate slots will be given." },
                    { name: "Judges and coordinators' decisions shall be final and binding. There shall be no arguments in this regard." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Choreo night (Eastern)",
    },

    // street X
    {
        "category": 1,
        "description": "This one's for the ones with soul. Flexibility is a must, of the body as well as of the mind. Street dancers from all over the country battle it out to be the very best. Make the crowd go crazy and amaze the judges with your flawless moves. Step up and take on the world with your dancing.",
        "endTime": 1488443400,
        "image": "https://s-media-cache-ak0.pinimg.com/originals/b3/90/d9/b390d9e1bc8199c6584275eb38ec9421.jpg",
        "coords": [
            { name: "Abhinav", phone: "+91 8951507993" },
            { name: "Dheeraj V Poojari", phone: "+91 8747954725" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 1500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "This an all styles crew on crew event." },
                    { name: "A team of 6-15 members can participate." },
                    { name: "The open round of 4+2 min is to be performed by each crew.." },
                    { name: "The top 4 crews qualify for the face offs." },
                    { name: "The crews battling are picked at random" },
                    { name: "The winners of the battle will be going to the finals." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Street X",

    },

    // 7 to smoke
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "https://images3.alphacoders.com/850/85097.jpg",
        "coords": [
            { name: "Daeshan", phone: "+91 8147954725" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }],
        "registration": 400,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                description: "It is a two round event: Prelims and Finals.",
                subContent: [
                    { name: "Prelims: Selection is on the basis of a random cyphering round between the participants. The best 8 will be selected by the judge who will move on to compete in the 7 to smoke Event." },
                    { name: "The finals will be a battle round in which the Bboys will clash in a quick 1 vs. 1 battle of one round. The judges give their decision very quickly and the winning Bboy gets 1 point and remains while the other one joins the end of the line." },
                    { name: "Then another Bboy comes out and has the possibility to beat the previous victor and so it goes on like that for about 20 minutes." },
                    {
                        name: "winning", hasSubItem: true, description: "There are two ways of taking the championship:",
                        subContent: [
                            { name: "To beat 7 Bboys in a row." },
                            { name: "One with the most points at the end." },
                        ]
                    },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "7 to Smoke",

    },

    //solo dance
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.dailyemerald.com/wp-content/uploads/2012/02/120217.nb_.workdancecompany-hultcenter.9206.jpg",
        "coords": [
            { name: "Karthin Suresh", phone: "+91 9741260060" },
            { name: "Shamili T", phone: "+91 7624836354" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rounds 1", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "It's a solo dance event." },
                    { name: "Each contestant is supposed to perform on their own track for 1.5-3 minutes." },
                    { name: "All dance forms are allowed (no constraints on the dance genres)." },
                    { name: "Contestants qualifying this will advance to the finals." },
                ]
            }, {
                name: "Round 2(Finals)", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Contestants will be performing to 2min track." },
                    { name: "Decisions of the judges will be final." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Solo Dance",

    },

    // Theme dance
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.dailyemerald.com/wp-content/uploads/2012/02/120217.nb_.workdancecompany-hultcenter.9206.jpg",
        "coords": [
            { name: "Rajat Kumar", phone: "+91 9611389433" },
            { name: "Aditi Urs", phone: "+91 88951245419" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rounds 1", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "It's a solo dance event." },
                    { name: "Each contestant is supposed to perform on their own track for 1.5-3 minutes." },
                    { name: "All dance forms are allowed (no constraints on the dance genres)." },
                    { name: "Contestants qualifying this will advance to the finals." },
                ]
            }, {
                name: "Round 2(Finals)", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Contestants will be performing to 2min track." },
                    { name: "Decisions of the judges will be final." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Theme Dance",

    },

    // ground zero
    {
        "category": 1,
        "description": "The ocean of Rock music has always been commodious to versatile expression be it transcendental chord progressions or heavy guitar riffs. Feel the anticipation and the electricity as bands fight it out, reaching for the zenith of the genre as they hope to be crowned victors of this prestigious title.",
        "endTime": 1488443400,
        "image": "http://cdn.bandmix.com/bandmix_us/media/342/342523/471133-l.jpg",
        "coords": [
            { name: "Aditya Joshi", phone: "+91 8095870862" },
            { name: "Ishant Shekhar", phone: "+91 9008697197" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 35000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registration": 1500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "This is a band competition open to any college or semi-pro band with three or more members with any genre." },
                    { name: "It’s a 2 round competition, Eliminations and Finals" },
                    { name: "All songs performed by the band must be in ENGLISH only." },
                    { name: "The time given per band- (10+2) mins (15+5) mins for the Finals. This includes the time taken for sound-check and the performance. Strictly no extra time would be given on stage." },
                    { name: "Tuning of instruments should be done beforehand." },
                    { name: "Bands will be disqualified with immediate effect for misconduct, obscenity or intentional use of foul language." },
                    { name: "Bands have to bring their own equipment (apart from the ones mentioned below) and special effects. However, programmed music isn’t allowed." },
                    { name: "The judge’s decision will be final and binding." },
                    { name: "The event coordinators and the Anaadyanta committee reserves the right to make any last minute changes in the rules." },
                ]
            }, {
                name: "Equipment provided will be", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "One bass amplifier speaker" },
                    { name: "One lead amplifier speaker" },
                    { name: "Adequate microphones" },
                    { name: "Drum set with double base setup (you can bring your own cymbals and chokes/high hats)" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Ground Zero",
    },

    //acoustic
    {
        "category": 1,
        "description": "Glide through harmonies and let your vocal chords unfurl their magic upon all those listening. Play and sing your heart out on stage as you hit the right notes with your audience; captivating them with your rhythm and make them groove to your tunes. This is your opportunity to take on the best teams across the nation and establish your music skills",
        "endTime": 1488443400,
        "image": "https://nillywrites.files.wordpress.com/2014/07/maxresdefault.jpg",
        "coords": [
            { name: "Amogh Acharya", phone: "+91 9901584186" },
            { name: "Lohit AM", phone: "+91 8147995391" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "2-8 Members are allowed to perform at this event." },
                    { name: "This is a single round competition." },
                    { name: "Bands playing acoustic and acapella are allowed." },
                    { name: "TTime limit: (10+2) for a group performance. This time is inclusive of sound check." },
                    { name: "No electrical instruments would be allowed with the exception of electric bass. One synthesizer with only the piano sound is allowed per entry." },
                    { name: "The decision of the judges will be final and binding." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Acoustics",
    },

    //vocal eastern
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "https://udemy-images.udemy.com/course/750x422/450918_4af0_3.jpg",
        "coords": [
            { name: "Nikeetha Adiga", phone: "+91 9663835213" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each contestant is given a time of 3 minutes to perform." },
                    { name: "Contestants are allowed to use a karaoke track for their performance. " },
                    { name: "Contestants can also have one instrumental accompaniment for their performance. " },
                    { name: "Any vulgarity will lead to disqualification." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Vocal Solo (Eastern)",
    },

    //vocal western
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.howtosingbettertoday.com/wp-content/uploads/2015/03/Fotolia_72371498_M.jpg",
        "coords": [
            { name: "Manasa Hegde", phone: "+91 9611960847" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each contestant is given a time of 3 minutes to perform." },
                    { name: "Contestants are allowed to use a karaoke track for their performance. " },
                    { name: "Contestants can also have one instrumental accompaniment for their performance. " },
                    { name: "Any vulgarity will lead to disqualification." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Vocal Solo (Western)",
    },

    //BeatBox
    {
        "category": 1,
        "description": "Are you ready to blow the competition away? Well, if you think you're all about that bass, come participate in the BeatBoxing competition where you can dish out the melody in your soul, sans instruments and see where you stand!",
        "endTime": 1488443400,
        "image": "http://wonderopolis.org/_img?img=/wp-content/uploads/2012/09/rapper_shutterstock_50269645.jpg&transform=resizeCrop,720,450",
        "isGroup": false,
        "coords": [
            { name: "Anantha Piltu", phone: "+91 7411103996" },
            { name: "Akshat L Dongre", phone: "+91 8105968732" },
        ],
        "prizes": [{
            "amount": 6000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual participation. It's a one man show." },
                    { name: "The event will be split into three rounds: Prelims, Semis and the Finals." },
                    { name: "In the prelims, each beat boxer will be given 1 minute showcase and the judges will choose who wins the showcase based on THEIR judging criteria." },
                    { name: "The top 4 then move to the semis. In case of a tie, the judges will deliberate to break the tie." },
                    { name: "Failure to arrive on stage when called up on the stage will lead to disqualification." },
                    { name: "Competitors shouldn’t perform routines performed in public by other beatboxers." },
                    { name: "No instruments are allowed in the competition." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "BeatBox",
    },

    //solo instrumental
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.bloglet.com/gallery/the-most-popular-instrumental-music/the-most-popular-instrumental-music.jpg",
        "coords": [
            { name: "Ajay", phone: "+91 8951281596" },
            { name: "Pradyumna C", phone: "+91 9449021914" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each contestant is allotted a time of 3 minutes to exhibit their piece." },
                    { name: "Apart from drums, performers must bring their own instruments and cables." },
                    { name: "Exceeding the time limit will result in the reduction of scores. " },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Solo instrumental",
    },

    // fashion show
    {
        category: 1,
        "description": "Dive headlong into the world of fashion. Glamorize, add style and sophistication to the models in you. We can’t wait to see what you make in the all-encompassing fashion fiesta. The runway is your canvas, paint it with class and flaunt your world.",
        "endTime": 1488443400,
        "image": "http://cdn3-www.thefashionspot.com/assets/uploads/gallery/victorias-secret-2015-fashion-show/02-daniela-braga.jpg",
        "coords": [
            { name: "Yasha VIjaykumar", phone: "+91 9900932749" },
        ],
        "isGroup": true,
        "isFeatured": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registration": 2000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Fashion Show is open to college students only." },
                    { name: "Theme:  This is an Open Theme Event" },
                    { name: "All the members of a team must have a valid college ID card." },
                    { name: "Vulgarity of any kind would lead to disqualification of the team. It is strongly advised that the team consult the organizers if the team feels that any stunt or costume design can be deemed as vulgar. The decision of the organizers would be final in any kind of resulting dispute." },
                    { name: "Team Size: Maximum 20 members." },
                    { name: "Stage time: (8+2) mins for prep and performance. Each team is responsible for clearing the stage once their performance is over." },
                    { name: "Teams are to inform the organizers of any kind of props they plan to use during the event. Use of water, fire, pets, animal skin or any hazardous materials are not allowed. Teams are instructed to consult with the organizers before using any such material." },
                    { name: "Teams are instructed to submit their audio tracks 30 minutes prior to the event." },
                    { name: "The decision of the judges will be final and cannot be questioned." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Fashion Show",
    },

    // street play
    {
        category: 1,
        "description": "Altruism and brotherhood are integral to the idea of India. It permeates every fibre of our being. And yet, in this modern day and age, when we see atrocity and injustice in society, we choose to turn a blind eye. If you think you can open the eyes of those who have shut it against the evils in society, then this is your chance. Portray your anguish and concern for your brothers and sisters through the unique and moving art of Street Play",
        "endTime": 1488443400,
        "image": "http://cdn.journalism.cuny.edu/blogs.dir/779/files/2013/11/imag-playground.jpg",
        "coords": [
            { name: "Sanketh", phone: "+91 9740993360" },
            { name: "Vivek Vijay", phone: "+91 7760900398" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 15000,
            "position": 1
        }, {
            "amount": 7000,
            "position": 2
        }],
        "registration": 500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Time Limit – 15 minutes" },
                    { name: "Team members- 15 maximum." },
                    { name: "Only acoustic and percussion instruments will be allowed." },
                    { name: "Plays in English, Kannada and Hindi are allowed. Please avoid other languages except for a few dialogues." },
                    { name: "No props/costume will be provided." },
                    { name: "Please stick to the area allotted to the event." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Street Play",
    },


    // Improv
    {
        category: 1,
        "description": "Bring out the actor in you and let the spontaneity embrace the crowd and showcase your talent!",
        "endTime": 1488443400,
        "image": "http://www.theaterjones.com/images/large/l_281204081510.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Team size: 3-4 members." },
                    { name: "A moderator will be present to control the overall flow of the performance." },
                    { name: "The moderator holds the power to pause or stop the performance anytime he wishes." },
                    { name: "No arguments against the moderator will be entertained." },
                    { name: "A maximum of 2-5 minutes will be given for the preparation of the act." },
                    { name: "Time limit: 5-7 minutes." },
                    { name: "The moderator’s decision will be the final and binding one." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Improv",
    },


    // Monoacting
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.theaterjones.com/images/large/l_281204081510.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual event." },
                    { name: "Participants will be allotted 5 minutes to prepare the act." },
                    { name: "Time limit is 1-3 minutes to perform their act." },
                    { name: "Theme would be given on the spot." },
                    { name: "Obscenity and offensive gestures." },
                    { name: "Decision of the judges will be final and binding." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Monoacting",
    },



    // Art
    {
        category: 1,
        "description": "If you hear a voice within you say you cannot paint, then by all means paint and that voice will be silenced. Let the inner child in you take over as you create new worlds and paint dreams. Be it with brushes, sketches or charcoal, let your hands do the talking. All the artists out there, from the classroom doodlers to the painters, these events beckon you.",
        "endTime": 1488443400,
        "image": "http://www.theaterjones.com/images/large/l_281204081510.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Yet to be decided" },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Art",
    },


    // Imprint
    {
        category: 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://3.bp.blogspot.com/-YzNMdl1agcs/Uw9FPKDAyCI/AAAAAAAAk7s/tgtb13R3EPU/s1600/BBC.Natures.Weirdest.Events.Series.3.2of3.720p.HDTV.x264.AAC.MVGroup.org[18-27-19].JPG",
        "coords": [
            { name: "Ishaan", phone: "+91 9902456450" },
            { name: "Satya", phone: "+91 8697115528" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Team consists of 2 members." },
                    { name: "Collect different materials around the campus like leaves, flower etc" },
                    { name: "Dip them on your favourite colour to imprint the texture on provided cloth" },
                    { name: "You will be provided with only one cloth on which you can design your imagination." },
                    { name: "Paints will be provided, participants can also bring their own materials like brushes and paints." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Imprint",
    },


    // Blind art
    {
        category: 1,
        "description": "Channel your inner Picasso and connect with each other on an artistic level, become one with the painting.",
        "endTime": 1488443400,
        "image": "https://s-media-cache-ak0.pinimg.com/736x/d1/20/d7/d120d7b240a75941f11005fb45d29bc0.jpg",
        "coords": [
            { name: "Naveen", phone: "+91 9591719217" },
            { name: "Spandana Anantapuram", phone: "+91 9900946262" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "In this event, one person will be blindfolded and another person handcuffed." },
                    { name: "The handcuffed participant shall describe the picture and the blindfolded participant shall draw it." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Blind Art",
    },

    // Doodling
    {
        category: 1,
        "description": "A doodle is anything you want it to be. So doodle to your heart's content, only because you can and for no other reason.",
        "endTime": 1488443400,
        "image": "https://img1.cgtrader.com/items/41019/fc7969b9f6/photorealistic-commercial-building-collection-3d-model-max.jpg",
        "coords": [
            { name: "Prathiksha Hoode", phone: "+91 9686684268" },
            { name: "Nithya Balasubrmaniam", phone: "+91 9620306981" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Doodle away your thoughts as creatively as possible" },
                    { name: "The participants aren’t allowed to refer the internet or any pictures from their phones. This would lead to immediate disqualification." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Doodling",
    },


    // String art
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://cdn.homedit.com/wp-content/uploads/2013/09/blue-string-art.jpg",
        "coords": [
            { name: "Pooja", phone: "+91 9663747759" },
            { name: "Naga Charan", phone: "+91 9916028726" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 1000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual event." },
                    { name: "Draw outline of a creature and fill it with strings/wool." },
                    { name: "Art should be theme based (UNDERWATER)." },
                    { name: "Thermocol, nails, pin, basic colour wools will be provided." },
                    { name: "Participants are allowed to bring their own materials." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "String Art",
    },

    // Collage
    {
        category: 1,
        "description": "Use many fragments of different pictures and put them all together to form one beautiful photomontage.",
        "endTime": 1488443400,
        "image": "http://i0.wp.com/www.db-rep.net/wp-content/uploads/2011/11/bluecollage.jpg",
        "coords": [
            { name: "Sabari", phone: "+91 9686802990" },
            { name: "Priyanka", phone: "+91 9686046471" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "It's a team event. Two member team." },
                    { name: "All required materials will be provided." },
                    { name: "Participants are not allowed to use their own materials." },
                    { name: "Time duration is 3 hours." },
                    { name: "Specific instructions regarding the event and theme/ topic will be given on the spot." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Collage",
    },


    // Face painting
    {
        category: 1,
        "description": "One participant should paint the other using the colours and brushes provided.",
        "endTime": 1488443400,
        "image": "http://extras.thetimes.co.uk/public/2014/picgallery/0619_natgeo/images/05.jpg",
        "coords": [
            { name: "Simaant", phone: "+91 9631881074" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Team composition-2 members." },
                    { name: "Participants are required to paint face of their partner." },
                    { name: "Basic acrylic colour and brushes will be provided." },
                    { name: "Participants can bring their own materials." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Face Painting",
    },

    // DSLR Photography
    {
        "category": 1,
        "description": "A photograph is like a ticket to a moment that won’t last long. It is a story that cannot be put into words. It is a way to make others see what you want them to see. This Anaadyanta be sure to capture what we want you to, only to let us see it better than we would otherwise. ",
        "endTime": 1488443400,
        "image": "http://www.adorama.com/alc/wp-content/uploads/2016/02/shutterstock_163165859.jpg",
        "coords": [
            { name: "Rahul Banerjee", phone: "+91 7976573749" },
        ],
        "isGroup": false,
        "offlineReg": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "All participants should register offline at the Registration desk." },
                    { name: "The photograph must be shot on the days of the event based on the given theme." },
                    { name: "The participant can submit a maximum of 3 photos in a day." },
                    { name: "The photos can be taken using a DSLR." },
                    { name: "No editing the photograph." },
                    { name: "Photos must be submitted to the respective coordinator before the given deadline." },
                    { name: "The decision of the judge will be final and binding." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "DSLR Photography",
    },

    // Mobile Photography
    {
        category: 1,
        "description": "If you have a mobile with a decent camera, and the ability to take a brilliant picture WITHOUT a DSLR then participate in this informal event (on the spot registration) and use your phone to capture the perfect moment. A good photographer is someone who can capture the untold story anywhere and everywhere.",
        "endTime": 1488443400,
        "image": "https://udemy-images.udemy.com/course/750x422/58968_1f7a_2.jpg",
        "coords": [
            { name: "Arun", phone: "+91 8277564495" },
        ],
        "isGroup": false,
        "offlineReg": true,
        "prizes": [{
            "amount": 1000,
            "position": 1
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "All participants should register offline at the Registration desk." },
                    { name: "The photograph must be shot on the days of the event based on the given theme." },
                    { name: "The participant can submit a maximum of 3 photos in a day." },
                    { name: "The photos can be taken using a DSLR." },
                    { name: "No editing the photograph." },
                    { name: "Photos must be submitted to the respective coordinator before the given deadline." },
                    { name: "The decision of the judge will be final and binding." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Mobile Photography",
    },

    /*  Gaming events starts */



    // FIFA 14
    {
        "category": 2,
        "endTime": 1488443400,
        "description": "",
        "image": "https://media.easports.com/content/www-easports/en_US/fifa/news/2013/fifa-14-stadiums/_jcr_content/contentImages/image_0.img.jpg",
        "coords": [
            { name: "Shashank", phone: "+91 9483950426" },
            { name: "Shravan", phone: "+91 8971335061" }
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual Event." },
                    { name: "It’s a knockout event." },
                    { name: "In case of a draw, extra time is given which is followed by a penalty shootout." },
                    { name: "4 minutes a half." },
                    { name: "Joysticks are allowed. Participants are allowed to bring their own joysticks/gamepads/headphones but the Anaadyanta committee isn’t responsible for the loss of personal property." },
                    { name: "Players can pause for substitution if the ball is in their possession." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "FIFA 14",
    },

    // Counter Strike 1.6
    {
        "category": 2,
        "description": "",
        "endTime": 1488469020,
        "image": "https://lh3.googleusercontent.com/eDknS7zEoARTogx0bSKFbuvQovUphrwsOtNMjcRSX9v2IQP4f2I9WJ_C5dCSzjSlTO0o_Jg=s630-fcrop64=1,31210310d32ca610",
        "coords": [
            { name: "Ashish", phone: "+91 9739397282" },
            { name: "Darshan Prasanna", phone: "+91 9483969007" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 7000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        registration: 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 5 per team" },
                    { name: "Knockout tournament" },
                    { name: "WCG rules are valid" },
                    { name: "D3/AUI or KRIEG 550 COMMANDO is not allowed" },
                    { name: "e_dust 2, De_inferno, de_nuke (maps)." },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },

                ]
            },
        ],
        "registration": 99,
        "startTime": 1488458220,
        "title": "Counter Strike 1.6",
    },

    // DOTA 2
    {
        "category": 2,
        "endTime": 1488443400,
        "image": "https://i.ytimg.com/vi/-hjwn5A5424/maxresdefault.jpg",
        "coords": [
            { name: "Tajas V", phone: "+91 9739397282" },
            { name: "Suraj", phone: "+91 8660018359" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }],
        "registration": 500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 5 per team" },
                    { name: "Knockout event" },
                    { name: "Map version IS 6.81C" },
                    { name: "WCG(World Cyber Gaming) rules are valid" },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "DOTA 2",
    },

    // NFS
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Drive through the valley busting polices and your friends. Show them what they are, not what you are.",
        "image": "https://i.ytimg.com/vi/eZTup0qxUfQ/maxresdefault.jpg",
        "coords": [
            { name: "Abel", phone: "+91 9036136949" },
            { name: "Ejaaz", phone: "+91 9535145077" }
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
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
    },

    // COD MW
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Call of Duty: Modern Warefare. Hunt down your friends.",
        "image": "http://media.psu.com/media/call-of-duty-4:-modern-warfare/call-of-duty-4:-modern-warfare-ss-22.jpg",
        "coords": [
            { name: "Aman", phone: "+91 7406837999" },
            { name: "Abhay", phone: "+91 8861561754" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 2" },
                    { name: "Top 2 from each round advance to finals." },
                    { name: "No use of martyrdom and last stand (perks)." },
                    { name: "Maps-Killhouse, Showdown and Bag Backlot." },
                    { name: "K/D ratio will be considered." },
                    { name: "Breaking the rules or unethical gaming leads to disqualifications" },

                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Call of Duty - Modern Warefare",
    },

    // Mini soccer
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Play soccer and enjoy",
        "image": "https://static1.squarespace.com/static/54bf12efe4b0da9770953a83/t/54fce845e4b0edea648ddf84/1425860682249/Soccer-Stadium.jpg?format=1500w",
        "coords": [
            { name: "Navneet Gopinath", phone: "+91 9535307556" }
        ],
        isGroup: true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 5000,
            "position": 2
        }],
        "registration": 800,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 6 on field + 2 substitutes" },
                    { name: "Knockout Rounds." },
                    { name: "7 minutes each half" },
                    { name: "Tie will be settled by a penalty shootout." },
                    { name: "Kick in if the ball is out of play." },
                    { name: "Referee decision will be final" },
                ]
            },

        ],
        "startTime": 1488436200,
        "title": "Mini Soccer",
    },

    // 3v3 Basket ball
    {
        "category": 2,
        "endTime": 1488443400,
        description: "",
        "image": "https://localtvwhotv.files.wordpress.com/2014/11/basketball_court_blue.jpg",
        "coords": [
            { name: "Akshay Manjunath", phone: "+91 9535145801" },
            { name: "Darshan V M", phone: "+91 9538914988" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Each team shall consist of 4 players (3 players on the court and 1 substitute)." },
                    { name: "A coin flip shall determine which team gets the first possession." },
                    { name: "The regular playing time shall be a period of 6 minutes (i.e., 3+1+3) playing time." },
                    { name: "The first team which scores 21 points or more wins the game if it happens before the end of regular playing time." },
                    { name: "Substitutions can be done by any team when the ball becomes dead." },
                    { name: "Each team is granted one team time-out. Any player can call the time-out in a dead ball situation." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "3v3 basketBall",
    },

    // Volleyball
    {
        "category": 2,
        "endTime": 1488443400,
        description: "",
        "image": "https://localtvwhotv.files.wordpress.com/2014/11/basketball_court_blue.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 0,
            "position": 1
        }],
        "registration": 0,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Team composition - 6(on court) + 4" },
                    { name: "3 sets(first 2 sets of 25 points and decider 15 points) }," },
                    { name: "Conducted as per IVF Rules" },
                    { name: "Participants from engineering colleges only." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Volleyball",
    },


    // Batminton
    {
        "category": 2,
        "endTime": 1488443400,
        description: "",
        "image": "https://localtvwhotv.files.wordpress.com/2014/11/basketball_court_blue.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 0,
            "position": 1
        }],
        "registration": 0,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "BAI rules will apply" },
                    { name: "Entry limited to 16 teams, first come first serve basis." },
                    { name: "College ID is mandatory." },
                    { name: "Teams shall consist of 5 players each, format of 2 singles and 1 doubles match will be played." },
                    { name: "All matches shall be played for 21 points (3 sets) on knockout basis." },
                    { name: "Players must wear non-marking shoes on court." },
                    { name: "Decision of the organizing committee would be final." },
                ]
            },
        ],

        "startTime": 1488436200,
        "title": "Badminton",
    },


    /*  Gaming events ends */


    /*  tech events starts */

    // RC Aeroplane
    {
        "category": 3,
        "description": "Students must design, fabricate, and demonstrate the aircraft which is capable of achieving the highest score on the specified mission profile(s).",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Apurva Anand", phone: "+91 9036285404" },
            { name: "Prabin Sherpaili", phone: "+91 9591573884" },
        ],
        "isGroup": true,
        "isFeatured": true,
        "prizes": [{
            "amount": 15000,
            "position": 1
        }, {
            "amount": 12000,
            "position": 2
        }],
        "registration": 500,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A maximum of 4 members are allowed in each team." },
                    { name: "The aircraft may be of any configuration except rotary wing or lighter than-air. No structure/components may be dropped from the aircraft during flight." },
                    { name: "Must be propeller driven and electric powered with an unmodified over-the-counter model electric motor. May use multiple motors and/or propellers. May be direct drive or with gear or belt reduction." },
                    { name: "Motors may be any commercial brush or brushless electric motor." },
                    { name: "For safety, each aircraft will use commercially produced propeller/blades. Must use a commercially available propeller hub/pitch mechanism. Teams may modify the propeller diameter by clipping the tip and may paint the blades to balance the propeller. No other modifications to the propeller are allowed. Commercial ducted fan units are allowed." },
                    { name: "Battery pack(s) maximum weight limit is 1.75 lb." },
                    { name: "eams will be allowed a maximum of 4 flight attempts or 3 successful scoring flights. Once a mission has a successful scoring flight it may NOT be repeated to try to improve the score." },
                    { name: "Teams will be allowed a maximum of 4 flight attempts or 3 successful scoring flights. Once a mission has a successful scoring flight it may NOT be repeated to try to improve the score." },
                    { name: "If in doubt, Judges will have the discretion to ask team to demonstrate most demanding mission." },
                    { name: "Huddles will be explained on the spot." },
                    { name: "Make sure that the aircraft can perform maneuvers in all three axis i.e. longitudinal, vertical and lateral axis." },
                    { name: "The overall team score is a combination of the Design, of the Aircraft and Flight scores. The team with the highest overall team score will be declared the winner." },
                ]
            },
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true, description: "Grading of complete event will be as follows:",
                subContent: [
                    { name: "Design: 20 %" },
                    { name: "Flying: 80 %" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "RC Aeroplane",
    },

    // Hydro rocket
    {
        "category": 3,
        "description": "Design and launch a hydro rocket that can go as high as possible and land right at the launch point to nail it perfectly.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Anand Shah", phone: "+91 9620288342" },
            { name: "Aakrit Jaiswal", phone: "+91 9900283952" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A maximum of 3 members are allowed in each team." },
                    { name: "The participants have to bring their own rocket (except the launcher and pump)." },
                    { name: "The competitors are encouraged to be creative in the design of the fins and the nose cones of their rockets." },
                    { name: "The rockets are to be launched vertically from the center of the concentric circles with a radius of 1m, 2m and 3m." },
                    { name: "Any interference in the launch caused by the participants will result in the deduction of their points and a second chance will be given to the launching team." },
                    { name: "Battery pack(s) maximum weight limit is 1.75 lb." },
                    { name: "The participants can vary the volume of water used but the air pressure will be specified on the spot." },
                    { name: "Each team will be given a maximum of 2 trials and the best among the 2 will be considered." },
                    { name: "Points will be awarded based on the vertical distance travelled by the rocket and the point where it lands after the flight. The team with the maximum points will be declared as the winner." },
                    { name: "In case of a draw, there will be a third launch between the teams to determine the winner." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Hydro Rocket",
    },

    // Quad Speed
    {
        "category": 3,
        "description": "Participants have to bring their built or bought quad copters for racing around air obstacles and beating the time of others.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Roshan Sah", phone: "+91 8970283716" },
            { name: "Dipendra Gupta", phone: "+91 7411251598" },
        ],
        "isGroup": true,
        "isFeatured": true,
        "prizes": [{
            "amount": 20000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The built/bought copters is limited with specification (50cm*50cm)." },
                    { name: "Three participants per team. " },
                    { name: "No modifications to a default bought copter." },
                    { name: "Five rounds of increasing difficulty with filtering in each round." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Completion of each round." },
                    { name: "Time taken. " },
                    { name: "Failure of the model mid-flight which leads to direct disqualification." },
                    { name: "Five rounds of increasing difficulty with filtering in each round." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Quad Speed",
    },

    // Flight Simulator
    {
        "category": 3,
        "description": "This event will check the knowledge of the participants in aircraft performance and control on Microsoft Flight SimulatorX. Time and maneuvers are critical for score.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Navaneet", phone: "+91 9739816496" },
            { name: "Chintan", phone: "+91 900889652" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "All the participants will be given a mission on the spot which they have to complete." },
                    { name: "The judgment will be done on multiple fronts viz, time taken to complete, fuel consumed, structural damages etc." },
                    { name: "The complete list of judgment criteria and the scoring scheme will be announced by the coordinator along with the mission requirements." },
                    { name: "One who completes the mission with highest score (combined) will be declared as winner." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Flight Simulator",
    },

    // Line Follower
    {
        "category": 3,
        "description": "An autonomous robot has to follow black line on a white background and reach from starting line to finishing line as quick as possible.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Karthik", phone: "+91 8553936108" },
            { name: "Nandan", phone: "+91 9901767137" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 8000,
            "position": 1
        }, {
            "amount": 6000,
            "position": 2
        }],
        "registration": 300,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Robots will be placed at starting point and time will be recorded until it reaches finish line." },
                    { name: "Each individual will be given two trials." },
                    { name: "Maximum of two restarts in each trial." },
                    { name: "If the robot stops or misses the line, then it has to start from the previous check point." },
                    { name: "The robot must be controlled autonomously with no human aid." },
                    { name: "The robot cannot have potential more than 12V between any two points." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Arena", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The thickness of the lines will be 30 mm" },
                    { name: "The arena has two check points in total." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Line Follower",
    },

    // Circuitrix
    {
        "category": 3,
        "description": "This contest is to test the breadboard circuit analysis skills of the participants. The team that can correct the circuit to get the desired output wins the competition.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Suryakiran", phone: "+91 9986281443" },
            { name: "Vincent Raj", phone: "+91 9740941674" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The team can have maximum of two members." },
                    { name: "All team members must be currently enrolled as students in colleges.." },
                    { name: "Participants are not allowed to have cell phones with them during the event." },
                    { name: "The decision of the judges is final." },
                    { name: "Participants should not spoil any components or devices provided to them." },
                    { name: "Number of rounds will be decided depending on the number of teams taking part in the event." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Circuitrix",
    },

    // Full Throttle
    {
        "category": 3,
        "description": "Make a wireless remote controlled machine, which can race against other opponents, maneuver and zoom on an off-road dirt track kind of obstacles.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Pawan", phone: "+91 9901158810" },
            { name: "Jayprakash", phone: "+91 9035761592" },
        ],
        "isGroup": true,
        "isFeatured": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 8000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The team can have maximum of four members" },
                    { name: "The car must fit into a box of 30cm x 25cm x 20cm at any point in the race." },
                    { name: "The cars are to be fabricated by the team. Cars bought from the market or built from a DIY kit available for purchase will be disqualified." },
                    { name: "The teams are allowed to use a single battery of maximum 15 volts on the car." },
                    { name: "There will be two rounds." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Full Throttle",
    },

    // Fox Hunt
    {
        "category": 3,
        "description": "Fox Hunt is an activity involving the tracking, chase, and sometimes killing of a fox (here it is getting the clues by tracking down an RF transmitter), by trained foxhounds (RF Receivers, and a group of unarmed followers led by a master of foxhounds (team lead), who follow the hounds on foot.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486490061/Rubiks_Cube_owfrrd.png",
        "coords": [
            { name: "Nagesh", phone: "+91 8971435900" },
            { name: "Sachin", phone: "+91 9742758644" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 150,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Members Per Team- 2-3" },
                    { name: "Time Limit- 30-45 minutes per round" },
                    { name: "At the end of finding each clue, the participants have to take a picture of clue with the transmitter." },
                    { name: "Those participants who’ll find the exact location of final transmitter and hand over all the clues to the event coordinator will be the winners of the event." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            }
        ],
        "startTime": 1488436200,
        "title": "Fox Hunt",
    },

    // Robo wars
    {
        "category": 3,
        "endTime": 1488443400,
        description: "The traditional headline of the tech fest will witness the bots taking on each other unleashing their weapons.  Dab, hammer, turtle and corner your opponent to stand as the Roboking !",
        "image": "https://i.ytimg.com/vi/G4s5ewM_-pw/maxresdefault.jpg",
        "coords": [
            { name: "Prabodh", phone: "+91 9036543295" },
            { name: "Gaurav Kulkarni", phone: "+91 8277605437" },
        ],
        "isGroup": true,
        "isFeatured": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 35000,
            "position": 2
        }],
        "registration": 700,
        rules: [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Three rounds per bout of 120s." },
                    { name: "Max of five participants per team." },
                    { name: "Bout might end with a knockout" },
                    { name: "Final decision based on the damage." },
                ]
            },

            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Degree of damage." },
                    { name: "Time taken." },
                ]
            },

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
                name: "Safety Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Special care should be taken to protect the on-board batteries and pneumatics, robot without proper protection will not be allowed to compete." },
                    { name: "If you have a robot or weapon design that does not fit within the categories set forth in these rules or is in some way ambiguous or borderline, please contact the event organizers. Safe innovation is always encouraged, but surprising the organizers with your brilliant exploitation of a loophole may cause your robot to be disqualified before it even competes." },
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
    },

    // Bug me not (Debugging)

    {
        "category": 3,
        "description": "Can you dive into deep mysterious world or machine mind and find me?. Well I am waiting for you - BUG",
        "endTime": 1488443400,
        "image": "http://www.ephlux.com/wp-content/uploads/2013/04/debugging.jpg",
        "coords": [
            { name: "Akshdeep", phone: "+91 9632402156" },
            { name: "Priyesh Kumar", phone: "+91 7795778808" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Team specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A team can consist of minimum of one member and maximum of 2." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "No online help is allowed." },
                    { name: "The output expected will be informed beforehand." },
                    { name: "Errors in the program can be any of the following: logical errors, syntactic errors, semantic errors, run-time errors etc." },
                    { name: "The winner declaration will be solely based on performance in the second round." },
                    { name: "Event coordinators will hold the right to settle any disputes and their decisions will be final and binding." },
                ]
            },
            {
                name: "Rounds", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Round 1: A pen-paper round to test your basic C programming skills. THis round will be the selecting criteria for 2nd round." },
                    { name: "Round 2: We put you on computer with oreloaded erroneous programs. You need to find and fix the bug in minimum time." },
                ]
            },

        ],
        "startTime": 1488436200,
        "title": "Bug Me Not",

    },

    // On Spot programming
    {
        "category": 3,
        "description": "Prepare to unleash the coder in you, as this event provides an opportunity to test your coding skills but not in the stereotypical way. This event puts in test your learning curve and ability your ability implement faster.",
        "endTime": 1488443400,
        "image": "https://insights-images.thoughtworks.com/pairprogramming_f0d3ae7ef121e981e150bfcae4ecb995.jpg",
        "coords": [
            { name: "harsh", phone: "+91 8123358131" },
            { name: "Rajnarayan Dutta", phone: "+91 9164841394" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 6500,
            "position": 1
        }, {
            "amount": 4500,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Team specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A team can consist of minimum of one member and maximum of 2." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },

            {
                name: "Rounds", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Round 1: This round will test your basic proficiency in programming. The top 5 teams will go to the second round." },
                    { name: "Round 2: A surprise awaits. Something new welcomes you! The details of this round will be shared just before the start of the round" },
                ]
            },
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Winners will be announced based on the performance in the particular assignment of this round. The performance in 1st round will not be considered." },
                    { name: "A GNU/GCC compiler will be used." },
                    { name: "Resources like internet and reference books are not allowed." },
                    { name: "Event coordinators will hold the right to settle any disputes and their decisions will be final and binding." },
                    { name: "The finalized rules will be disclosed five minutes before the actual events." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "On Spot Programming",

    },

    // Guess the code
    {
        "category": 3,
        "description": "The participant will be given an executable file which will have a particular output. Based on the output, the participant the guess the code of it and code it to gain points.",
        "endTime": 1488443400,
        "image": "https://insights-images.thoughtworks.com/pairprogramming_f0d3ae7ef121e981e150bfcae4ecb995.jpg",
        "coords": [
            { name: "Malvin", phone: "+91 9663099295" },
            { name: "Srinub", phone: "+91 8971389284" },
            { name: "Akhil", phone: "+91 9538943136" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Based on the difficulty of the problem, there are points allocated to them." },
                    { name: "Person having the highest point by the end of the event will be winner." },
                ]
            },
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "ONE Participant per team." },
                    { name: "Programming Language C, C++" },
                    { name: "The finalized rules will be disclosed five minutes before the actual events." },
                    { name: " Participants must carry a valid ID card of their institute." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Guess The Code",

    },

    // Rubiks cube
    {
        "category": 3,
        "description": "Love to solve Rubik’s Cube and Rubik’s Revenge? Here is the chance to solve it in the least time than the others and take away a good prize by just following your hobby !",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "coords": [
            { name: "Shivam Dubey", phone: "+91 8050225474" },
            { name: "Nivedita", phone: "+91 9035566966" },
            { name: "Pavan", phone: "+91 7022146411" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "All World Cubing Association (WCA) rules will be applicable" },
                    { name: "General rules will be announced before starting of the event." },
                    { name: "Judgment Criteria will be based on WCA." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Rubik's Cube",

    },

    // Hackathon
    {
        "category": 3,
        "description": "If you are a creative programmer, this is the event you should exactly look for. The theme is “Cashless Economy”, based on which a usable application has to be created. Finally, the team has to give a demonstration of its application for about 10 min.",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": "Worth 1 Lakh",
            "position": 1
        }],
        "registration": 0,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The duration of the event is 24 hours." },
                    { name: "The team should consist of not more than 3 students." },
                    { name: "The application can be developed on any platform." },
                    { name: "Laptops are allowed." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Judgment criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Creativity involved in the application developed." },
                    { name: "Relevance to the theme given." },
                    { name: "The application can be developed on any platform." },
                    { name: "Effectiveness of the demonstration given at the end." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Hackathon",

    },

    // Flappy Bird Live
    {
        "category": 3,
        "description": "A physical version of the flappy bird game where you need to ‘jump’ the bird with the touch of a button.",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Individual participation" },
                    { name: "Participant with the highest score will be declared as the winner" },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Flappy Bird Live",

    },

    // Robosoccer
    {
        "category": 3,
        "description": "It’s time for some fun now. Build and Unleash your robot on the field. Let the game begin!!",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "coords": [
            { name: "Prasanna", phone: "+91 9483969007" },
            { name: "Dipendra", phone: "+91 8147018125" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 8000,
            "position": 1
        }, {
            "amount": 6000,
            "position": 2
        }],
        "registration": 200,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Only 2 participants per team are allowed." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Bot specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The bot dimensions should be less than 30*30*30 (length*width*height) with 5% tolerance" },
                    { name: "The weight of the bot should not exceed 5kg." },
                    { name: "Wired or wireless both bots are allowed, but are considered in the same category and are made to compete together" },
                    { name: "The bots should be operated by batteries only, IC engines are not allowed." },
                    { name: "The maximum Voltage between any two points in the circuit should not exceed 12V" },
                    { name: "Batteries should be on board the bot and carrying the batteries are not allowed." },
                    { name: "All the bots should run by Direct current (DC) only, Alternating Current (AC) bots are not allowed and any external socket is not provided to run the bots, But there will be sockets to charge the rechargeable batteries." },
                    { name: "The bots may or may not possess a kicking mechanism to put the ball past the goal line." },
                    { name: "During the event the ball must be exposed and can only be pushed or pulled hence carrying the ball or covering it from the opponent by catching it inside the ball is prohibited." },
                    { name: "The time duration for the rounds and other specific rules regarding the event will be announced at the event venue." },
                ]
            },
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The bot which scores the maximum number of goals will be declared as the winner." },
                    { name: "In case of a tie, a penalty shootout will determine the winner." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Robosoccer",
    },

    // Automotive Quiz
    {
        "category": 3,
        "description": "A competitive quiz contest with various rounds of different challenges. The questions and tasks will be completely based on automotive industry, market, design and recent technologies.",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "coords": [
            { name: "Baswaraj Y", phone: "+91 9738768225" },
            { name: "Kalyan C", phone: "+91 8050792685" },
            { name: "Akshay Bhat", phone: "+91 8904491980" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "4 rounds of various challenges." },
                    { name: "Only TWO participants per team." },
                    { name: "Interaction and communication based tasks" },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of correct answers." },
                    { name: "Judges’ will have the final decision." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Automotive Quiz",
    },

    // Paper Presentation
    {
        "category": 3,
        "description": "Presenting a paper from one of the select topics. Must include research work or business model with new, original and innovative idea.",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "coords": [
            { name: "Athreya", phone: "+91 9483957700" },
            { name: "Priyanka", phone: "+91 9886624666" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 100,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "The maximum duration of the presentation is 20 minutes." },
                    { name: "Max of two participants per team." },
                    { name: "The questionnaire will follow presentation for 10 minutes by assigned judges." },
                    { name: "Plagiarism is not tolerated" },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Authenticity and originality." },
                    { name: "Technical data interpretation" },
                    { name: "Real world application" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Paper Presentation",
    },


    // Jahazz
    {
        "category": 3,
        "endTime": 1488443400,
        description: "It’s time to get the boats under the sun and race them around obstacles and zoom ahead of others.",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/1b/eb/f0/1bebf0c6bd05e72b78ed385b97091976.jpg",
        "coords": [
            { name: "Keerthi P", phone: "+91 9382708205" },
            { name: "Jayshree", phone: "+91 8904520789" },
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 150,
        "rules": [

            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Maximum of four participants per team" },
                    { name: "Dimensions of the boat should not exceed 250*150mm, height is not restricted." },
                    { name: "Rechargeable battery is a must. (6V)" },
                    { name: "Solar panels – crude/glass type - 6V" },
                    { name: "Must be solar powered which will be checked before the start of the race, failing which the team will be disqualified." },
                    { name: "Must be solar powered which will be checked before the start of the race, failing which the team will be disqualified." },
                    { name: "Wired/wireless RC is permitted" },
                    { name: "There will be three rounds based on speed, moving around obstacles; the details of which will be announced before the start of the event." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Jahazz",
    },

    // SETU
    {
        "category": 3,
        "endTime": 1488443400,
        "description": "Design a Cable Stayed suspension bridge using Popsicle sticks, cotton strings and Fevicol adhesive that can sustain the maximum possible load with minimum deflection, satisfying the understated constraints.",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/1b/eb/f0/1bebf0c6bd05e72b78ed385b97091976.jpg",
        "coords": [
            { name: "Ranjan", phone: "+91 8553663602" },
            { name: "Shubham", phone: "+91 8867250295" },
            { name: "Rajesh", phone: "+91 8147533810" },
        ],
        "isGroup": false,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [

            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Materials will be provided" },
                    { name: "Dimensions will be given on the spot" },
                    { name: "Once the structure is weighed, you are not allowed to modify the structure in any way." },
                    { name: "6 hours will be provided for making the model." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Judgment criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Aesthetic view" },
                    { name: "Dead mass of the Bridge" },
                    { name: "Vertical Deflection of the center of the bridge deck during failure." },
                    { name: "Load carried by the structure before failure" },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "SETU",
    },

    // Tall structures
    {
        "category": 3,
        "endTime": 1488443400,
        "description": "Design a Cable Stayed suspension bridge using Popsicle sticks, cotton strings and Fevicol adhesive that can sustain the maximum possible load with minimum deflection, satisfying the understated constraints.",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/1b/eb/f0/1bebf0c6bd05e72b78ed385b97091976.jpg",
        "coords": [
            { name: "Monesh", phone: "+91 8553042866" },
            { name: "Karthik", phone: "+91 9663783855" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 150,
        "rules": [
            {
                name: "Team specifications", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "A team may consist of a maximum of 4 members." },
                    { name: "Students from different educational institutes can form a team." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },
            {
                name: "Design constraint", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Limited spaghetti will be provided" },
                ]
            },
            {
                name: "Material constraint", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Spaghetti and adhesive material should only be used to build the structure." },
                    { name: "Spaghetti can be cut or trimmed to any shape and size." },
                    { name: "Adhesive can only be used to join the spaghetti together. Adhesives cannot be applied on the free surface of the member made of spaghetti that increase in its strength and misleading the results" },
                    { name: "Any kind of colouring or painting the structure is not allowed." },
                    { name: "The team will be disqualified it found using any other material other than those mentioned in any part of the structure" },
                ]
            },
            {
                name: "Testing", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "It is tested on the basis of its appearance, stability and height of the structure." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Tall Structures",
    },

    // Drop The Egg
    {
        "category": 3,
        "endTime": 1488443400,
        "description": "Egg drop challenge is an on the spot event in which teams have to design a compact structure using different types of materials acquired by them through Auctioning. Teams have to drop the structure from a height of 40ft. The aim is to prevent the egg from cracking.",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/1b/eb/f0/1bebf0c6bd05e72b78ed385b97091976.jpg",
        "coords": [
            { name: "Shalini S", phone: "+91 7411443447" },
            { name: "Pooja S", phone: "+91 8123309756" }
        ],
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 50,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Maximum size of structure – 30*30*30(cm)" },
                    { name: "Fixed height – 40 feet" },
                    { name: "Use of adhesives between Material and Egg is not permitted." },
                    { name: "Maximum time will be 1 hour for designing the structure after getting material from auctioning" },
                    { name: "The structure should be dropped with zero velocity." },
                    { name: "Two chances shall be given to each Team. However, the second chance will lead to a penalty of 10 points" },
                    { name: "Teams are not allowed to take structure with them." },
                    { name: "Teams can only use material provided at that time through Auctioning. Using materials from outside will lead to disqualification." },
                    { name: "Participants must carry a valid ID card of their institute." },
                ]
            },

            {
                name: "Judgement criteria", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Effectiveness & simplicity of the model" },
                    { name: "Design explanation & Aesthetics" },
                    { name: "Time to design the model." },
                    { name: "There will be some penalty in case the model doesn’t work in the first attempt." },
                ]
            },
        ],
        "startTime": 1488436200,
        "title": "Drop The Egg",
    },

    /* tech events ends */

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

        let { currentUser } = this.props

        // alert("complete the list first")
        // return

        this.setState({
            message: "working"
        })
        // if (user) {
        const newPostKey = firebaseApp.database().ref().child('events').push().key
        const postData = {
            ...e,
            euid: newPostKey,
            lastUpdated: moment().unix(),
            startTime: moment("2017-03-02 12:00", "YYYY-MM-DD h:m").unix(),
            endTime: moment("2017-03-02 14:00", "YYYY-MM-DD h:m").unix(),
            isStarted: false,
            isEnded: false,
            updatedBy: currentUser.name,
        }


        const uid = currentUser.uid;
        let updates = {}
        updates['/events/' + newPostKey] = postData

        firebaseApp.database().ref().update(updates).then((res) => {
            this.setState({
                message: "done"
            })

        }).catch((err) => {
            alert(JSON.stringify(err))

        })
        // } else {
        //     alert("Un authorized")
        // }
        //    })//


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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
const mapActions = dispatch => ({
})

export default connect(mapStateToProps, mapActions)(AddEvent);

