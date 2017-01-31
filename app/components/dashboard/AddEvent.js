
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
        isGroup: true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registeration": 2000,
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
        "image": "https://i.ytimg.com/vi/TRNZzrl9KgE/maxresdefault.jpg",
        isGroup: true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registeration": 2000,
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
        "isGroup": true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registeration": 1500,
        "rules": [
            {
                name: "General rules", isHeader: true, hasSubItem: true,
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
        "venue": "Main Ground",

    },

    // 7 to smoke
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "https://images3.alphacoders.com/850/85097.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }],
        "registeration": 400,
        "rules": [
            {
                name: "Rounds", isHeader: true, hasSubItem: true,
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
        "venue": "Main Ground",

    },

    //solo dance
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.dailyemerald.com/wp-content/uploads/2012/02/120217.nb_.workdancecompany-hultcenter.9206.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 200,
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
        "venue": "Main Ground",

    },

    // ground zero
    {
        "category": 1,
        "description": "The ocean of Rock music has always been commodious to versatile expression be it transcendental chord progressions or heavy guitar riffs. Feel the anticipation and the electricity as bands fight it out, reaching for the zenith of the genre as they hope to be crowned victors of this prestigious title.",
        "endTime": 1488443400,
        "image": "http://cdn.bandmix.com/bandmix_us/media/342/342523/471133-l.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 35000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registeration": 1500,
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
        "venue": "Main Ground",
    },

    //acoustic
    {
        "category": 1,
        "description": "Glide through harmonies and let your vocal chords unfurl their magic upon all those listening. Play and sing your heart out on stage as you hit the right notes with your audience; captivating them with your rhythm and make them groove to your tunes. This is your opportunity to take on the best teams across the nation and establish your music skills",
        "endTime": 1488443400,
        "image": "https://nillywrites.files.wordpress.com/2014/07/maxresdefault.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }],
        "registeration": 300,
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
        "venue": "Main Ground",
    },

    //vocal eastern
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "https://udemy-images.udemy.com/course/750x422/450918_4af0_3.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registeration": 4589,
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
        "venue": "Main Ground",
    },

    //vocal western
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.howtosingbettertoday.com/wp-content/uploads/2015/03/Fotolia_72371498_M.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registeration": 300,
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
        "venue": "Main Ground",
    },

    //BeatBox
    {
        "category": 1,
        "description": "Are you ready to blow the competition away? Well, if you think you're all about that bass, come participate in the BeatBoxing competition where you can dish out the melody in your soul, sans instruments and see where you stand!",
        "endTime": 1488443400,
        "image": "http://wonderopolis.org/_img?img=/wp-content/uploads/2012/09/rapper_shutterstock_50269645.jpg&transform=resizeCrop,720,450",
        "isGroup": false,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registeration": 300,
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
        "venue": "Main Ground",
    },

    //solo instrumental
    {
        "category": 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://www.bloglet.com/gallery/the-most-popular-instrumental-music/the-most-popular-instrumental-music.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registeration": 300,
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
        "venue": "Main Ground",
    },

    // fashion show
    {
        category: 1,
        "description": "Dive headlong into the world of fashion. Glamorize, add style and sophistication to the models in you. We can’t wait to see what you make in the all-encompassing fashion fiesta. The runway is your canvas, paint it with class and flaunt your world.",
        "endTime": 1488443400,
        "image": "http://cdn3-www.thefashionspot.com/assets/uploads/gallery/victorias-secret-2015-fashion-show/02-daniela-braga.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registeration": 2000,
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
        "venue": "Back parking",
    },

    // street play
    {
        category: 1,
        "description": "Altruism and brotherhood are integral to the idea of India. It permeates every fibre of our being. And yet, in this modern day and age, when we see atrocity and injustice in society, we choose to turn a blind eye. If you think you can open the eyes of those who have shut it against the evils in society, then this is your chance. Portray your anguish and concern for your brothers and sisters through the unique and moving art of Street Play",
        "endTime": 1488443400,
        "image": "http://cdn.journalism.cuny.edu/blogs.dir/779/files/2013/11/imag-playground.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 15000,
            "position": 1
        }, {
            "amount": 7000,
            "position": 2
        }],
        "registeration": 500,
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
        "venue": "Back parking",
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
        "registeration": 200,
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
        "venue": "Back parking",
    },

    // Imprint
    {
        category: 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://3.bp.blogspot.com/-YzNMdl1agcs/Uw9FPKDAyCI/AAAAAAAAk7s/tgtb13R3EPU/s1600/BBC.Natures.Weirdest.Events.Series.3.2of3.720p.HDTV.x264.AAC.MVGroup.org[18-27-19].JPG",
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registeration": 50,
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
        "venue": "Back parking",
    },


    // Blind art
    {
        category: 1,
        "description": "Channel your inner Picasso and connect with each other on an artistic level, become one with the painting.",
        "endTime": 1488443400,
        "image": "https://s-media-cache-ak0.pinimg.com/736x/d1/20/d7/d120d7b240a75941f11005fb45d29bc0.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registeration": 50,
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
        "venue": "Back parking",
    },

    // Doodling
    {
        category: 1,
        "description": "A doodle is anything you want it to be. So doodle to your heart's content, only because you can and for no other reason.",
        "endTime": 1488443400,
        "image": "https://img1.cgtrader.com/items/41019/fc7969b9f6/photorealistic-commercial-building-collection-3d-model-max.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 100,
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
        "venue": "Back parking",
    },


    // String art
    {
        category: 1,
        "description": "",
        "endTime": 1488443400,
        "image": "http://cdn.homedit.com/wp-content/uploads/2013/09/blue-string-art.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 1000,
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
        "venue": "Back parking",
    },

    // Collage
    {
        category: 1,
        "description": "Use many fragments of different pictures and put them all together to form one beautiful photomontage.",
        "endTime": 1488443400,
        "image": "http://i0.wp.com/www.db-rep.net/wp-content/uploads/2011/11/bluecollage.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 50,
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
        "venue": "Back parking",
    },


    // Face painting
    {
        category: 1,
        "description": "One participant should paint the other using the colours and brushes provided.",
        "endTime": 1488443400,
        "image": "http://extras.thetimes.co.uk/public/2014/picgallery/0619_natgeo/images/05.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 100,
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
        "venue": "Back parking",
    },

    // DSLR Photography
    {
        category: 1,
        "description": "A photograph is like a ticket to a moment that won’t last long. It is a story that cannot be put into words. It is a way to make others see what you want them to see. This Anaadyanta be sure to capture what we want you to, only to let us see it better than we would otherwise. ",
        "endTime": 1488443400,
        "image": "http://www.adorama.com/alc/wp-content/uploads/2016/02/shutterstock_163165859.jpg",
        "isGroup": false,
        offlineReg: true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }],
        "registeration": 100,
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
        "venue": "Back parking",
    },

    // Mobile Photography
    {
        category: 1,
        "description": "If you have a mobile with a decent camera, and the ability to take a brilliant picture WITHOUT a DSLR then participate in this informal event (on the spot registration) and use your phone to capture the perfect moment. A good photographer is someone who can capture the untold story anywhere and everywhere.",
        "endTime": 1488443400,
        "image": "https://udemy-images.udemy.com/course/750x422/58968_1f7a_2.jpg",
        "isGroup": false,
        offlineReg: true,
        "prizes": [{
            "amount": 1000,
            "position": 1
        }],
        "registeration": 100,
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
        "venue": "Back parking",
    },

    /// cultural ends
    /*  Gaming events starts */


    // FIFA 14
    {
        "category": 2,
        "endTime": 1488443400,
        description: "I am the best :)>",
        "image": "https://media.easports.com/content/www-easports/en_US/fifa/news/2013/fifa-14-stadiums/_jcr_content/contentImages/image_0.img.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registeration": 100,
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
        "description": "Play counter strike and win exciting prizes like tank and Boeing 777",
        "endTime": 1488469020,
        "image": "https://lh3.googleusercontent.com/eDknS7zEoARTogx0bSKFbuvQovUphrwsOtNMjcRSX9v2IQP4f2I9WJ_C5dCSzjSlTO0o_Jg=s630-fcrop64=1,31210310d32ca610",
        "isGroup": true,
        "prizes": [{
            "amount": 7000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        registeration: 300,
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
        "registeration": 99,
        "startTime": 1488458220,
        "title": "Counter Strike 1.6",
    },

    // DOTA 2
    {
        "category": 2,
        "endTime": 1488443400,
        "euid": "-KaXe8lHDZO-tJ0IP1Ja",
        "image": "https://i.ytimg.com/vi/-hjwn5A5424/maxresdefault.jpg",
        "isGroup": false,
        "lastUpdated": 1484591460,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }],
        "registeration": 500,
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
        "isGroup": false,
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
    },

    // COD MW
    {
        "category": 2,
        "endTime": 1488443400,
        description: "Call of Duty: Modern Warefare. Hunt down your friends.",
        "image": "http://media.psu.com/media/call-of-duty-4:-modern-warfare/call-of-duty-4:-modern-warfare-ss-22.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registeration": 100,
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
        "lastUpdated": 1484683111,
        isGroup: true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 5000,
            "position": 2
        }],
        "registeration": 1000,
        "rules": [
            {
                name: "Rules", isHeader: true, hasSubItem: true,
                subContent: [
                    { name: "Number of players: 6 on field + 2 substitutes" },
                    { name: "Knockout Rounds." },
                    { name: "7 minutes each half" },
                    { name: "In case of a draw,in mormal time ,match will be decided by penalty shoot-out(3 per team)" },
                    { name: "Goolkeeper is allowed to come out of the defence area and attack other's team coach" },
                    { name: "General rules of normal soccer apply" },
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
        description: "Think you are taller than me? Prove me :)>",
        "image": "https://localtvwhotv.files.wordpress.com/2014/11/basketball_court_blue.jpg",
        "isGroup": true,
        "lastUpdated": 1484819395,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registeration": 400,
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

    /*  Gaming events ends */


    /*  tech events starts */

    {
        category: 3,
        "description": "There will be isometric view of a dis-assembled model as well as assembled model is given in a sheet, the participants  need to crate the part and assembles it and take the draft of it with the help of CATIA or PRO-E",
        "endTime": 1488443400,
        "image": "http://housebuildersbrisbane.com.au/wp-content/uploads/2013/10/residential-architects-design.jpg",
        "isGroup": true,
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
        "category": 3,
        "endTime": 1488443400,
        description: "Design and construct a remote controlled robot capable of fighting a one on one tournament",
        "image": "https://i.ytimg.com/vi/G4s5ewM_-pw/maxresdefault.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 5000,
            "position": 2
        }],
        "registeration": 2000,
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
    },

    {
        "category": 3,
        "endTime": 1488443400,
        description: "A solar powered boat race. Fight against high tides like jack sparrow",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/1b/eb/f0/1bebf0c6bd05e72b78ed385b97091976.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registeration": 1000,
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
    },

    {
        "category": 3,
        "description": "Challenge you programming skill's",
        "endTime": 1488443400,
        "image": "https://insights-images.thoughtworks.com/pairprogramming_f0d3ae7ef121e981e150bfcae4ecb995.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3500,
            "position": 1
        }, {
            "amount": 2500,
            "position": 2
        }],
        "registeration": 150,
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
        "startTime": 1488436200,
        "title": "OnSpot Programming",
        "venue": "CS lab 15",

    },

    {
        "category": 3,
        "description": "Move your fingers at lightning speed to solve quest of colors",
        "endTime": 1488443400,
        "image": "http://www.guinnessworldrecords.com/Images/Largest-Rubiks-cube-solving_tcm25-425561.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3500,
            "position": 1
        }, {
            "amount": 2500,
            "position": 2
        }],
        "registeration": 150,
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
        "startTime": 1488436200,
        "title": "Rubix's Cube",
        "venue": "CS lab 15",

    },


    {
        "category": 3,
        "description": "Can you dive into deep mysterious world or machine mind and find me?. Well I am waiting for you - BUG",
        "endTime": 1488443400,
        "image": "http://www.ephlux.com/wp-content/uploads/2013/04/debugging.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3500,
            "position": 1
        }, {
            "amount": 2500,
            "position": 2
        }],
        "registeration": 150,
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
        "startTime": 1488436200,
        "title": "Code debugging",
        "venue": "CS lab 15",

    }

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

        //  firebaseApp.auth().onAuthStateChanged((user) => {

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

