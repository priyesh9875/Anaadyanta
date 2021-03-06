
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

    // Pro shows
    // Bonfire Night
    {
        "category": 2,
        "sequence": 'a0',
        "description": "Bonfire night",
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486985109/games/EGGS.jpg",
        "isProShow": true,
        "isFeatured": true,
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Maximum size of structure – 30*30*30(cm)"
                },]
            }],
        "title": "Bonfire Night",
    },

    // Proshow
    {
        "category": 2,
        "sequence": 'a1',
        "description": "Proshow",
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486985109/games/EGGS.jpg",
        "isProShow": true,
        "isFeatured": true,
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Maximum size of structure – 30*30*30(cm)"
                },]
            }],
        "title": "Proshow",
    },


    /// Cultural 

    // Fashion show
    {
        "category": 1,
        "sequence": 'a0',
        "coords": [{
            "name": "Yasha Vijaykumar",
            "phone": "+91 9900932749"
        }],
        "description": "Dive headlong into the world of fashion. Glamorize, add style and sophistication to the models in you. We can’t wait to see what you make in the all-encompassing fashion fiesta. The runway is your canvas, paint it with class and flaunt your world",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536776/02-daniela-braga_yef5qt.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 15000,
            "position": 2
        }],
        "registration": 2000,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Fashion Show is open to college students only."
            }, {
                "name": "Theme:  This is an Open Theme Event"
            }, {
                "name": "All the members of a team must have a valid college ID card."
            }, {
                "name": "Vulgarity of any kind would lead to disqualification of the team. It is strongly advised that the team consult the organizers if the team feels that any stunt or costume design can be deemed as vulgar. The decision of the organizers would be final in any kind of resulting dispute."
            }, {
                "name": "Team Size: Maximum 20 members."
            }, {
                "name": "Stage time: (8+2) mins for prep and performance. Each team is responsible for clearing the stage once their performance is over."
            }, {
                "name": "Teams are to inform the organizers of any kind of props they plan to use during the event. Use of water, fire, pets, animal skin or any hazardous materials are not allowed. Teams are instructed to consult with the organizers before using any such material."
            }, {
                "name": "Teams are instructed to submit their audio tracks 30 minutes prior to the event."
            }, {
                "name": "The decision of the judges will be final and cannot be questioned."
            }]
        }],
        "startTime": 1488436200,
        "title": "Fashion Show",
    },

    // Street X
    {
        "category": 1,
        "sequence": 'a1',
        "coords": [{
            "name": "Abhinav",
            "phone": "+91 8951507993"
        }, {
            "name": "Dheeraj V Poojari",
            "phone": "+91 8747954725"
        }],
        "description": "This one's for the ones with soul. Flexibility is a must, of the body as well as of the mind. Street dancers from all over the country battle it out to be the very best. Make the crowd go crazy and amaze the judges with your flawless moves. \n\n Step up and take on the world with your dancing.",
        "endTime": 1489161600,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984369/cultural/street_X.jpg",
        "isGroup": true,
        "lastUpdated": 1487022076,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 1500,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "This an all styles crew on crew event."
            }, {
                "name": "A team of 6-15 members can participate."
            }, {
                "name": "The open round of 4+2 min is to be performed by each crew."
            }, {
                "name": "The top 4 crews qualify for the face offs."
            }, {
                "name": "The crews battling are picked at random"
            }, {
                "name": "The winners of the battle will be going to the finals."
            }]
        }],
        "startTime": 1489149000,
        "title": "Street X",
    },

    // Ground 0 eastern
    {
        "category": 1,
        "sequence": 'a2',
        "coords": [{
            "name": "Lohit A.M",
            "phone": "+91 8147995391"
        }, {
            "name": "Deepak JE",
            "phone": "+91 8123384359"
        }],
        "description": "The ocean of Rock music has always been commodious to versatile expression be it transcendental chord progressions or heavy guitar riffs. Feel the anticipation and the electricity as bands fight it out, reaching for the zenith of the genre as they hope to be crowned victors of this prestigious title.",
        "endTime": 1488443400,
        "image": "http://cdn.bandmix.com/bandmix_us/media/342/342523/471133-l.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 1000,
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [
                    {
                        "name": "This is a band competition open to any college or semi-pro band with three or more members ."
                    }, {
                        "name": "Bands of any genre can participate in this event. The best of the lot would be selected into the finals to perform and compete for the win."
                    }, {
                        "name": "It’s a 2 round competition, Eliminations and Finals"
                    }, {
                        "name": "The time given per band- (10+2) mins (15+5) mins for the Finals. This includes the time taken for sound-check and the performance. Strictly no extra time would be given on stage."
                    }, {
                        "name": "Tuning of instruments should be done beforehand."
                    }, {
                        "name": "Bands will be disqualified with immediate effect for misconduct, obscenity or intentional use of foul language."
                    }, {
                        "name": "Bands have to bring their own equipment (apart from the ones mentioned below) and special effects. However, programmed music isn’t allowed."
                    }, {
                        "name": "The judge’s decision will be final and binding."
                    }, {
                        "name": "The event coordinators and the Anaadyanta committee reserves the right to make any last minute changes in the rules."
                    }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Equipment provided will be",
                "subContent": [{
                    "name": "One bass amplifier speaker"
                }, {
                    "name": "One lead amplifier speaker"
                }, {
                    "name": "Adequate microphones"
                }, {
                    "name": "Drum set with double base setup (you can bring your own cymbals and chokes/high hats)"
                }]
            }],
        "startTime": 1488436200,
        "title": "Ground Zero (Eastern)",
    },

    // Ground 0 western
    {
        "category": 1,
        "sequence": 'a3',
        "coords": [{
            "name": "Aditya Joshi",
            "phone": "+91 8095870862"
        }, {
            "name": "Ishant Shekhar",
            "phone": "+91 9008697197"
        }],
        "description": "The ocean of Rock music has always been commodious to versatile expression be it transcendental chord progressions or heavy guitar riffs. Feel the anticipation and the electricity as bands fight it out, reaching for the zenith of the genre as they hope to be crowned victors of this prestigious title.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487025158/cultural/ground_zero_western.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [
                    {
                        "name": "This is a band competition open to any college or semi-pro band with three or more members ."
                    }, {
                        "name": "Bands of any genre can participate in this event. The best of the lot would be selected into the finals to perform and compete for the win."
                    }, {
                        "name": "It’s a 2 round competition, Eliminations and Finals"
                    }, {
                        "name": "The time given per band- (10+2) mins (15+5) mins for the Finals. This includes the time taken for sound-check and the performance. Strictly no extra time would be given on stage."
                    }, {
                        "name": "Tuning of instruments should be done beforehand."
                    }, {
                        "name": "Bands will be disqualified with immediate effect for misconduct, obscenity or intentional use of foul language."
                    }, {
                        "name": "Bands have to bring their own equipment (apart from the ones mentioned below) and special effects. However, programmed music isn’t allowed."
                    }, {
                        "name": "The judge’s decision will be final and binding."
                    }, {
                        "name": "The event coordinators and the Anaadyanta committee reserves the right to make any last minute changes in the rules."
                    }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Equipment provided will be",
                "subContent": [{
                    "name": "One bass amplifier speaker"
                }, {
                    "name": "One lead amplifier speaker"
                }, {
                    "name": "Adequate microphones"
                }, {
                    "name": "Drum set with double base setup (you can bring your own cymbals and chokes/high hats)"
                }]
            }],
        "startTime": 1488436200,
        "title": "Ground Zero (Western)",
    },

    // Choreo nite Eastern
    {
        "category": 1,
        "sequence": 'a4',
        "coords": [{
            "name": "Aditi Urs",
            "phone": "+91 8951245419"
        }, {
            "name": "Rajat Kumar",
            "phone": "+91 9611389433"
        }],
        "description": "Dance is the hidden language of the soul - Martha Graham.\n\n If you've got what it takes to narrate a story with just your body, to get all those around you to their feet, this is your chance to put that talent to the test. So pick up your dancing shoes and get ready for the biggest night of your lives.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984329/cultural/choreonight_E.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 2000,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                {
                    "name": "This is a Non-Theme (Strictly eastern) competition."
                }, {
                    "name": "Each team will be given a time slot of 8+2 minutes to perform which includes the time taken for stage set up. Music will be stopped exactly after 8 minutes."
                }, {
                    "name": "Minimum number of participants per team is 8. Maximum number of participants per team is 30 plus backstage helpers."
                }, {
                    "name": "Participation is open to college and semi-pro teams."
                }, {
                    "name": "Video prelims will be conducted for confirming team slots. Send in the dance sequence video links to lavanya@anaadyanta.org."
                }, {
                    "name": "Inflammable objects, water and hazardous objects are NOT allowed on stage. No indecent behavior will be tolerated during the performance."
                }, {
                    "name": "Any team which fails to perform during their allotted slot will be disqualified and no other alternate slots will be given."
                }, {
                    "name": "Judges and coordinators' decisions shall be final and binding. There shall be no arguments in this regard."
                }]
        }],
        "startTime": 1488436200,
        "title": "Choreo Nite (Eastern)",
    },

    // Choreo nite western
    {
        "category": 1,
        "sequence": 'a5',
        "coords": [{
            "name": "Prerana Permanand",
            "phone": "+91 9972995418"
        }, {
            "name": "Anusha HP",
            "phone": "+91 9686991686"
        }],
        "description": "Dance is the hidden language of the soul - Martha Graham.\n\n If you've got what it takes to narrate a story with just your body, to get all those around you to their feet, this is your chance to put that talent to the test. So pick up your dancing shoes and get ready for the biggest night of your lives.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984252/cultural/choreonight_W.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 30000,
            "position": 1
        }, {
            "amount": 10000,
            "position": 2
        }],
        "registration": 2000,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                {
                    "name": "This is a Non-Theme (Strictly western) competition."
                }, {
                    "name": "Each team will be given a time slot of 8+2 minutes to perform which includes the time taken for stage set up. Music will be stopped exactly after 8 minutes."
                }, {
                    "name": "Minimum number of participants per team is 8. Maximum number of participants per team is 30 plus backstage helpers."
                }, {
                    "name": "Participation is open to college and semi-pro teams."
                }, {
                    "name": "Video prelims will be conducted for confirming team slots. Send in the dance sequence video links to lavanya@anaadyanta.org."
                }, {
                    "name": "Inflammable objects, water and hazardous objects are NOT allowed on stage. No indecent behavior will be tolerated during the performance."
                }, {
                    "name": "Any team which fails to perform during their allotted slot will be disqualified and no other alternate slots will be given."
                }, {
                    "name": "Judges and coordinators' decisions shall be final and binding. There shall be no arguments in this regard."
                }]
        }],
        "startTime": 1486576380,
        "title": "Choreo Nite (Western)",
    },

    // 7 to Smoke
    {
        "category": 1,
        "sequence": 'a6',
        "coords": [{
            "name": "Darshan",
            "phone": "+91 8147954725"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556142/cultural/7tosmoke.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }],
        "registration": 400,
        "rules": [
            {
                "description": "It is a two round event: Prelims and Finals.",
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Prelims: Selection is on the basis of a random cyphering round between the participants. The best 8 will be selected by the judge who will move on to compete in the 7 to smoke Event."
                }, {
                    "name": "The finals will be a battle round in which the Bboys will clash in a quick 1 vs. 1 battle of one round. The judges give their decision very quickly and the winning Bboy gets 1 point and remains while the other one joins the end of the line."
                }, {
                    "name": "Then another Bboy comes out and has the possibility to beat the previous victor and so it goes on like that for about 20 minutes."
                },
                ],

            },
            {
                "description": "There are two ways of taking the championship:",
                "hasSubItem": true,
                "isHeader": true,
                "name": "Winning",
                "subContent": [{
                    "name": "To beat 7 Bboys in a row."
                }, {
                    "name": "2. One with the most points at the end of the 20 minutes. Most of the time when Bboys have the   same amount of points at the end of the battle they end up battling each other in a TIEBREAK."
                }]
            }],
        "startTime": 1488436200,
        "title": "7 to Smoke",
    },

    // Solo dance
    {
        "category": 1,
        "sequence": 'a7',
        "coords": [{
            "name": "Karthik Suresh",
            "phone": "+91 9741260060"
        }, {
            "name": "Shamili T",
            "phone": "+91 7624836354"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556130/cultural/SoloDance.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rounds 1",
                "subContent": [
                    {
                        "name": "It's a solo dance event."
                    }, {
                        "name": "Each contestant is supposed to perform on their own track for 1.5-3 minutes."
                    }, {
                        "name": "All dance forms are allowed (no constraints on the dance genres)."
                    }, {
                        "name": "Contestants qualifying this will advance to the finals."
                    }]
            },
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Round 2(Finals)",
                "subContent": [{
                    "name": "Contestants will be performing to 2min track."
                }, {
                    "name": "Decisions of the judges will be final."
                }]
            }
        ],
        "startTime": 1488436200,
        "title": "Solo Dance",
    },

    // Acoustics
    {
        "category": 1,
        "sequence": 'a8',
        "coords": [{
            "name": "Amogh Acharya",
            "phone": "+91 9901584186"
        }],
        "description": "Glide through harmonies and let your vocal chords unfurl their magic upon all those listening. Play and sing your heart out on stage as you hit the right notes with your audience; captivating them with your rhythm and make them groove to your tunes. This is your opportunity to take on the best teams across the nation and establish your music skills.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536700/maxresdefault_ypjmof.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }],
        "registration": 300,
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "2-8 Members are allowed to perform at this event."
                }, {
                    "name": "This is a single round competition."
                }, {
                    "name": "Bands playing acoustic and acapella are allowed."
                }, {
                    "name": "TTime limit: (10+2) for a group performance. This time is inclusive of sound check."
                }, {
                    "name": "No electrical instruments would be allowed with the exception of electric bass. One synthesizer with only the piano sound is allowed per entry."
                }, {
                    "name": "The decision of the judges will be final and binding."
                }]
            }],
        "startTime": 1488436200,
        "title": "Acoustics",
    },

    // Vocal Solo Eastern
    {
        "category": 1,
        "sequence": 'a9',
        "coords": [{
            "name": "Nikeetha Adiga",
            "phone": "+91 9663835213"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556165/cultural/solo_vocal_east.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Each contestant is given a time of 3 minutes to perform."
            }, {
                "name": "Contestants are allowed to use a karaoke track for their performance. "
            }, {
                "name": "Contestants can also have one instrumental accompaniment for their performance. "
            }, {
                "name": "Any vulgarity will lead to disqualification."
            }]
        }],
        "startTime": 1488436200,
        "title": "Vocal Solo (Eastern)",
    },

    // Vocal solo Western
    {
        "category": 1,
        "sequence": 'b0',
        "coords": [{
            "name": "Manasa Hegde",
            "phone": "+91 9611960847"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556167/cultural/solo_vocal_west.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Each contestant is given a time of 3 minutes to perform."
            }, {
                "name": "Contestants are allowed to use a karaoke track for their performance. "
            }, {
                "name": "Contestants can also have one instrumental accompaniment for their performance. "
            }, {
                "name": "Any vulgarity will lead to disqualification."
            }]
        }],
        "startTime": 1488436200,
        "title": "Vocal Solo (Western)",
    },

    // Beat box
    {
        "category": 1,
        "sequence": 'b1',
        "coords": [{
            "name": "Anantha Piltu",
            "phone": "+91 7411103996"
        }, {
            "name": "Akshat L Dongre",
            "phone": "+91 8105968732"
        }],
        "description": "Are you ready to blow the competition away? Well, if you think you're all about that bass, come participate in the BeatBoxing competition where you can dish out the melody in your soul, sans instruments and see where you stand!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536741/_img_o80gaf.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 6000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 300,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual participation. It's a one man show."
            }, {
                "name": "The event will be split into three rounds: Prelims, Semis and the Finals."
            }, {
                "name": "In the prelims, each beat boxer will be given 1 minute showcase and the judges will choose who wins the showcase based on THEIR judging criteria."
            }, {
                "name": "The top 4 then move to the semis. In case of a tie, the judges will deliberate to break the tie."
            }, {
                "name": "Failure to arrive on stage when called up on the stage will lead to disqualification."
            }, {
                "name": "Competitors shouldn’t perform routines performed in public by other beatboxers."
            }, {
                "name": "No instruments are allowed in the competition."
            }]
        }],
        "startTime": 1488436200,
        "title": "BeatBox",
    },

    // Solo instrumental
    {
        "category": 1,
        "sequence": 'b2',
        "coords": [{
            "name": "Ajay",
            "phone": "+91 8951281596"
        }, {
            "name": "Pradyumna C",
            "phone": "+91 9449021914"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536762/the-most-popular-instrumental-music_mlv5qd.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2500,
            "position": 1
        }],
        "registration": 300,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Each contestant is allotted a time of 3 minutes to exhibit their piece."
            }, {
                "name": "Apart from drums, performers must bring their own instruments and cables."
            }, {
                "name": "Exceeding the time limit will result in the reduction of scores. "
            }]
        }],
        "startTime": 1488436200,
        "title": "Solo Instrumental",
    },

    // Street play
    {
        "category": 1,
        "sequence": 'b3',
        "coords": [{
            "name": "Dixit Jain",
            "phone": "+91 8003059419"
        }, {
            "name": "Srivasta G",
            "phone": "+91 9739529623"
        }, {
            "name": "Vivek Vijay",
            "phone": "+91 7760900398"
        }],
        "description": "Altruism and brotherhood are integral to the idea of India. It permeates every fibre of our being. And yet, in this modern day and age, when we see atrocity and injustice in society, we choose to turn a blind eye. If you think you can open the eyes of those who have shut it against the evils in society, then this is your chance. Portray your anguish and concern for your brothers and sisters through the unique and moving art of Street Play",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556170/cultural/streetplay.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 15000,
            "position": 1
        }, {
            "amount": 7000,
            "position": 2
        }],
        "registration": 500,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Time Limit – 15 minutes"
            }, {
                "name": "Team members- 15 maximum."
            }, {
                "name": "Only acoustic and percussion instruments will be allowed."
            }, {
                "name": "Plays in English, Kannada and Hindi are allowed. Please avoid other languages except for a few dialogues."
            }, {
                "name": "No props/costume will be provided."
            }, {
                "name": "Please stick to the area allotted to the event."
            }]
        }],
        "startTime": 1488436200,
        "title": "Street Play",
    },

    // Improv
    {
        "category": 1,
        "sequence": 'b4',
        "coords": [{
            "name": "Vishaal Rao",
            "phone": "+91 9769413903"
        }, {
            "name": "Numaan Ataaz",
            "phone": "+91 9620812737"
        }, {
            "name": "Sanketh",
            "phone": "+91 9740993360"
        }],
        "description": "Bring out the actor in you and let the spontaneity embrace the crowd and showcase your talent!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556162/cultural/improv.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Team size: 3-4 members."
            }, {
                "name": "A moderator will be present to control the overall flow of the performance."
            }, {
                "name": "The moderator holds the power to pause or stop the performance anytime he wishes."
            }, {
                "name": "No arguments against the moderator will be entertained."
            }, {
                "name": "A maximum of 2-5 minutes will be given for the preparation of the act."
            }, {
                "name": "Time limit: 5-7 minutes."
            }, {
                "name": "The moderator’s decision will be the final and binding one."
            }]
        }],
        "startTime": 1488436200,
        "title": "Improv",
    },

    // Mono acting
    {
        "category": 1,
        "sequence": 'b5',
        "coords": [{
            "name": "Pradeep Tiwari",
            "phone": "+91 9738801150"
        }],
        "description": "I regard the theatre of greatest of all forms, the most immediate way in which a human being can share with another the sense of what it is to be a human being. - Oscar Wilde, \n\n Drama has the power to express your thoughts in public. Come out and show us the inner de Niro in you!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556160/cultural/monoacting.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 800,
            "position": 1
        }, {
            "amount": 300,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual event."
            }, {
                "name": "Participants will be allotted 5 minutes to prepare the act."
            }, {
                "name": "Time limit is 1-3 minutes to perform their act."
            }, {
                "name": "Theme would be given on the spot."
            }, {
                "name": "Obscenity and offensive gestures."
            }, {
                "name": "Decision of the judges will be final and binding."
            }]
        }],
        "startTime": 1488436200,
        "title": "Monoacting",
    },

    // Imprint
    {
        "category": 1,
        "sequence": 'b6',
        "coords": [{
            "name": "Ishaan",
            "phone": "+91 9902456450"
        }, {
            "name": "Satya",
            "phone": "+91 8697115528"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984518/cultural/imprint.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Team consists of 2 members."
            }, {
                "name": "Collect different materials around the campus like leaves, flower etc"
            }, {
                "name": "Dip them on your favourite colour to imprint the texture on provided cloth"
            }, {
                "name": "You will be provided with only one cloth on which you can design your imagination."
            }, {
                "name": "Paints will be provided, participants can also bring their own materials like brushes and paints."
            }]
        }],
        "startTime": 1488436200,
        "title": "Imprint",
    },

    // Blind art
    {
        "category": 1,
        "sequence": 'b7',
        "coords": [{
            "name": "Naveen",
            "phone": "+91 9591719217"
        }, {
            "name": "Spandana Anantapuram",
            "phone": "+91 9900946262"
        }],
        "description": "Channel your inner Picasso and connect with each other on an artistic level, become one with the painting.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984556/cultural/BLINT_ART.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 1500,
            "position": 1
        }, {
            "amount": 800,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "In this event, one person will be blindfolded and another person handcuffed."
            }, {
                "name": "The handcuffed participant shall describe the picture and the blindfolded participant shall draw it."
            }]
        }],
        "startTime": 1488436200,
        "title": "Blind Art",
    },

    // Doodling
    {
        "category": 1,
        "sequence": 'b7',
        "coords": [{
            "name": "Prathiksha Hoode",
            "phone": "+91 9686684268"
        }, {
            "name": "Nithya Balasubrmaniam",
            "phone": "+91 9620306981"
        }],
        "description": "A doodle is anything you want it to be. So doodle to your heart's content, only because you can and for no other reason.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/q_auto:eco/v1486984653/cultural/DOODLING.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Doodle away your thoughts as creatively as possible"
            }, {
                "name": "The participants aren’t allowed to refer the internet or any pictures from their phones. This would lead to immediate disqualification."
            }]
        }],
        "startTime": 1488436200,
        "title": "Doodling",
    },

    // String art
    {
        "category": 1,
        "sequence": 'b9',
        "coords": [{
            "name": "Sanjana M",
            "phone": "+91 7022161825"
        }, {
            "name": "Suha A",
            "phone": "+91 9739345360"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556128/cultural/string_art.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 1000,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual event."
            }, {
                "name": "Draw outline of a creature and fill it with strings/wool."
            }, {
                "name": "Art should be theme based (UNDERWATER)."
            }, {
                "name": "Thermocol, nails, pin, basic colour wools will be provided."
            }, {
                "name": "Participants are allowed to bring their own materials."
            }]
        }],
        "startTime": 1488436200,
        "title": "String Art",
    },

    // Collage
    {
        "category": 1,
        "sequence": 'c0',
        "coords": [{
            "name": "Sabari",
            "phone": "+91 9686802990"
        }, {
            "name": "Priyanka",
            "phone": "+91 9686046471"
        }],
        "description": "Use many fragments of different pictures and put them all together to form one beautiful photomontage.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536878/bluecollage_phh5co.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "It's a team event. Two member team."
            }, {
                "name": "All required materials will be provided."
            }, {
                "name": "Participants are not allowed to use their own materials."
            }, {
                "name": "Time duration is 3 hours."
            }, {
                "name": "Specific instructions regarding the event and theme/ topic will be given on the spot."
            }]
        }],
        "startTime": 1488436200,
        "title": "Collage",
    },

    // Face Painting
    {
        "category": 1,
        "sequence": 'c1',
        "coords": [{
            "name": "Simaant",
            "phone": "+91 9631881074"
        }],
        "description": "One participant should paint the other using the colours and brushes provided.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556157/cultural/face_paint.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 2000,
            "position": 1
        }, {
            "amount": 1000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Team composition-2 members."
            }, {
                "name": "Participants are required to paint face of their partner."
            }, {
                "name": "Basic acrylic colour and brushes will be provided."
            }, {
                "name": "Participants can bring their own materials."
            }]
        }],
        "startTime": 1488436200,
        "title": "Face Painting",
    },

    // DSLR 
    {
        "category": 1,
        "sequence": 'c2',
        "coords": [{
            "name": "Rahul Banerjee",
            "phone": "+91 7976573749"
        }],
        "description": "A photograph is like a ticket to a moment that won’t last long. It is a story that cannot be put into words. It is a way to make others see what you want them to see. This Anaadyanta be sure to capture what we want you to, only to let us see it better than we would otherwise. ",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556151/cultural/dslr_photo.jpg",
        "isGroup": false,
        "offlineReg": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "All participants should register offline at the Registration desk."
            }, {
                "name": "The photograph must be shot on the days of the event based on the given theme."
            }, {
                "name": "The participant can submit a maximum of 3 photos in a day."
            }, {
                "name": "The photos can be taken using a DSLR."
            }, {
                "name": "No editing the photograph."
            }, {
                "name": "Photos must be submitted to the respective coordinator before the given deadline."
            }, {
                "name": "The decision of the judge will be final and binding."
            }]
        }],
        "startTime": 1488436200,
        "title": "DSLR Photography",
    },

    // Mobile
    {
        "category": 1,
        "sequence": 'c3',
        "coords": [{
            "name": "Arun",
            "phone": "+91 8277564495"
        }],
        "description": "If you have a mobile with a decent camera, and the ability to take a brilliant picture WITHOUT a DSLR then participate in this informal event (on the spot registration) and use your phone to capture the perfect moment. A good photographer is someone who can capture the untold story anywhere and everywhere.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486556154/cultural/mobile_photo.jpg",
        "isGroup": false,
        "offlineReg": true,
        "prizes": [{
            "amount": 1000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "All participants should register online/offline at the Registration desk."
            }, {
                "name": "The photograph must be shot on the days of the event based on the given theme."
            }, {
                "name": "The participant can submit a maximum of 3 photos in a day."
            }, {
                "name": "The photos can only be taken using a mobile phone."
            }, {
                "name": "No editing the photograph."
            }, {
                "name": "Photos must be submitted to the respective coordinator before the given deadline."
            }, {
                "name": "The decision of the judge will be final and binding."
            }]
        }],
        "startTime": 1488436200,
        "title": "Mobile Photography",
    },


    // Debate
    {
        "category": 1,
        "sequence": 'c4',
        "coords": [{
            "name": "Suraj Chowdary",
            "phone": "+91 8884870490"
        }],
        "description": "Speak. Analyze. Counter. If making a solid argument gives you an adrenaline rush, then this event is definitely for you. Join forces with a teammate as you go for or against a pressing issue in society and face your opponent as they challenge your points and stance and impress the judges with your command over the topic. Let the verbal jousting begin!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487026430/debate.jpg",
        "prizes": [{
            "amount": 8000,
            "position": 1
        }, {
            "amount": 3500,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Each team consists of 2 members." },
                { "name": "Teams will be paired off and a topic will be given 30 minutes before the event." },
                { "name": "First speaker from the team speaking for the motion will speak for 2.5 minutes." },
                { "name": "The opposition will cross question for 1minute." },
                { "name": "First speaker from the team speaking against the motion will speak for 2.5 minutes." },
                { "name": "The opposition will cross question for 1 minute." },
                { "name": "Second speaker from the team speaking for the motion will speak for 2.5 minutes." },
                { "name": "Opposition will cross question for 1 minute." },
                { "name": "Second speaker from the team speaking against the motion will speak for 2.5 minutes." },
                { "name": "Opposition will cross question for 1 minute." },
                { "name": "Judge will ask one question to each team at the end of the round." },
            ]
        }],
        "startTime": 1488436200,
        "title": "The Contention (Debate)",
    },

    // Pot Pourri
    {
        "category": 1,
        "sequence": 'c5',
        "coords": [{
            "name": "Sadiya Ameem",
            "phone": "+91 9739357539"
        }],
        "description": "From Dumb Charades and Pictionary to Jon Snow, Harry Potter and Sherlock; if you consider yourself talented at party games or unbeatable at fandom trivia, then this event is definitely for you. Join us in a competition of light hearted, mind bending games which test your senses, fandom quizzes which test your mettle or solve a crime like the eminent Mr. Holmes, get ready for an epic contest to see how well you communicate with your teammate.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487025979/pot_pourri.jpg",
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Teams of 2. " },
                { "name": "The Event will start off with a preliminary round. Top 6 teams will go on to the finals ." },
                { "name": "The Finals will consist of multiple rounds having fandom trivia, dumb charades, Pictionary etc." },
                { "name": "Fandom Trivia will comprise of Harry Potter, Game of Thrones, Sherlock, and LOTR." },
            ]
        }],
        "startTime": 1488436200,
        "title": "Pot Pourri",
    },


    // JAM
    {
        "category": 1,
        "sequence": 'c6',
        "coords": [{
            "name": "Arjun Kini",
            "phone": "+91 9901279266"
        }],
        "description": "'If you ever had one shot, or one opportunity to seize everything you ever wanted. In one moment would you capture it or just let it slip?'\n\n Seize the one minute you’re given and get in a big story as you can from a given idea, being as imaginative and ingenious without a flaw as your opposition waits for the moment you stumble. Find out how long you can last and figure out if pointing out speech and grammatical flaws are your forte in this competition of imagination and command over the language!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487025979/pot_pourri.jpg",
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Solo event." },
                { "name": "Participants need to speak for 1 minute. " },
                { "name": "Standard JAM rules will apply." },
                { "name": "The JAM masters’ ruling will be final.   " },
            ]
        }],
        "startTime": 1488436200,
        "title": "JAM",
    },

    // General quiz
    {
        "category": 1,
        "sequence": 'c7',
        "coords": [{
            "name": "Tejus Rao",
            "phone": "+91 9845530857"
        }],
        "description": "Buzz, Pass, Bounce and Pounce. See how you fare against other like-minded quizzers and riddlers in the general quiz, where your prowess in topics ranging from science to sports to tricky riddles are put to the test , in a competition of wit, speed, logic and risk taking. ",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487025813/general_quiz.jpg",
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Teams of 3 or less." },
                { "name": "Consists of a written preliminary round." },
                { "name": "Finals will contain multiple rounds." },
                { "name": "Quiz masters decision is final." },

            ]
        }],
        "startTime": 1488436200,
        "title": "General Quiz",
    },

    // Vices quiz
    {
        "category": 1,
        "sequence": 'c8',
        "coords": [{
            "name": "Gaurav Simha",
            "phone": "+91 9108519953"
        }],
        "description": "You know what this is about. A quiz about the things you’ve always wanted to (or dreaded talking about) on stage but couldn’t before.  Let your hair down, release your inhibitions and join us in this quiz to find out if you can beat your competition in this competition of all things explicit.  ",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487026584/vices_quiz.jpg",
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 200,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Solo event." },
                { "name": "Participants need to speak for 1 minute. " },
                { "name": "Standard JAM rules will apply." },
                { "name": "The JAM masters’ ruling will be final.   " },
            ]
        }],
        "startTime": 1488436200,
        "title": "Vices Quiz",
    },


    // Message in a bottle
    {
        "category": 1,
        "sequence": 'c9',
        "coords": [{
            "name": "Aishwarya Rao",
            "phone": "+91 9591529314"
        }],
        "description": "'Do you have what it takes to keep a tale going on no matter the odds? Can you string words along and make the tale go in the right direction?' \n\n The participants will each be given a set of words using which they’ll have to pen down their idea. The more creative the use of the words in their story, the better they fare. In this battle of words your vocabulary is your only weapon, wield it wisely.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/c_scale,w_1049/v1487026227/creative_writing.jpg",
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Solo Event" },
                { "name": "Time limit: 1.5 hours." },
                { "name": "Only entries in English will be considered.." },
                { "name": "The word set will be provided on the spot." },
            ]
        }],
        "startTime": 1488436200,
        "title": "Message In A Bottle (Creative Writing)",
    },



    // FIFA 14
    {
        "category": 1,
        "sequence": 'd0',
        "coords": [{
            "name": "Shashank",
            "phone": "+91 9483950426"
        }, {
            "name": "Shravan",
            "phone": "+91 8971335061"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "http://res.cloudinary.com/dep8pxurn/image/upload/q_auto:best/v1486984721/games/FIFA.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual Event."
            }, {
                "name": "It’s a knockout event."
            }, {
                "name": "In case of a draw, extra time is given which is followed by a penalty shootout."
            }, {
                "name": "4 minutes a half."
            }, {
                "name": "Joysticks are allowed. Participants are allowed to bring their own joysticks/gamepads/headphones but the Anaadyanta committee isn’t responsible for the loss of personal property."
            }, {
                "name": "Players can pause for substitution if the ball is in their possession."
            }]
        }],
        "startTime": 1488436200,
        "title": "FIFA 14",
    },

    // CS 1.6
    {
        "category": 1,
        "sequence": 'd1',
        "coords": [{
            "name": "Ashish",
            "phone": "+91 9739397282"
        }, {
            "name": "Darshan Prasanna",
            "phone": "+91 9483969007"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486582706/game/ConterStrike.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 7000,
            "position": 1
        }, {
            "amount": 3000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "A team must comprise of 5 members."
            }, {
                "name": "Knockout tournament."
            }, {
                "name": "WCG rules are valid."
            }, {
                "name": "D3/AUI or KRIEG 550 COMMANDO is not allowed."
            }, {
                "name": "e_dust 2, De_inferno, de_nuke (maps)."
            }, {
                "name": "Breaking the rules or unethical gaming leads to disqualifications."
            }]
        }],
        "startTime": 1488436200,
        "title": "Counter Strike 1.6",
    },

    // DOTA 2
    {
        "category": 1,
        "sequence": 'd2',
        "coords": [{
            "name": "Tajas V",
            "phone": "+91 9739397282"
        }, {
            "name": "Suraj",
            "phone": "+91 8660018359"
        }],
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984790/games/DOTA.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }],
        "registration": 500,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "A team must comprise of 5 members."
            }, {
                "name": "Knockout event."
            }, {
                "name": "Map version IS 6.81C."
            }, {
                "name": "WCG(World Cyber Gaming) rules are valid."
            }, {
                "name": "Breaking the rules or unethical gaming leads to disqualifications."
            }]
        }],
        "startTime": 1488436200,
        "title": "DOTA 2",
    },

    // NFS MW
    {
        "category": 1,
        "sequence": 'd3',
        "coords": [{
            "name": "Abel",
            "phone": "+91 9036136949"
        }, {
            "name": "Ejaaz",
            "phone": "+91 9535145077"
        }],
        "description": "Drive through the valley busting polices and your friends. Show them what they are, not what you are.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486536970/maxresdefault_wiyq6u.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual event."
            }, {
                "name": "It's Knockout tournament."
            }, {
                "name": "WCG(World Cyber Gaming) rules are valid"
            }, {
                "name": "Sprint races."
            }, {
                "name": "Bonus cars will be allowed."
            }, {
                "name": "Breaking the rules or unethical gaming leads to disqualifications."
            }]
        }],
        "startTime": 1488436200,
        "title": "NFS Most Wanted",
    },

    // COD MW
    {
        "category": 1,
        "sequence": 'd4',
        "coords": [{
            "name": "Aman",
            "phone": "+91 7406837999"
        }, {
            "name": "Abhay",
            "phone": "+91 8861561754"
        }],
        "description": "Call of Duty: Modern Warefare. Hunt down your friends.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486582714/game/modern_war.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                {
                    "name": "Top 2 from each round advance to finals."
                }, {
                    "name": "No use of martyrdom and last stand (perks)."
                }, {
                    "name": "Maps-Killhouse, Showdown and Bag Backlot."
                }, {
                    "name": "K/D ratio will be considered."
                }, {
                    "name": "Breaking the rules or unethical gaming leads to disqualifications."
                }]
        }],
        "startTime": 1488436200,
        "title": "Call of Duty Modern Warefare",
    },

    // Mini soccer
    {
        "category": 1,
        "sequence": 'd5',
        "coords": [{
            "name": "Navneet Gopinath",
            "phone": "+91 9535307556"
        }],
        "description": "Play soccer and enjoy",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486582707/game/mini_soc.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 5000,
            "position": 2
        }],
        "registration": 800,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Number of players: 6 on field + 2 substitutes"
            }, {
                "name": "Knockout Rounds."
            }, {
                "name": "7 minutes each half"
            }, {
                "name": "Tie will be settled by a penalty shootout."
            }, {
                "name": "Kick in if the ball is out of play."
            }, {
                "name": "Referee decision will be final"
            }]
        }],
        "startTime": 1488436200,
        "title": "Mini Soccer",
    },

    // BasketBall
    {
        "category": 1,
        "sequence": 'd6',
        "coords": [{
            "name": "Akshay Manjunath",
            "phone": "+91 9535145801"
        }, {
            "name": "Nikhlish R",
            "phone": "+91 9591581083"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984829/games/BASKETBALL.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 500,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Each team shall consist of 4 players (3 players on the court and 1 substitute)."
            }, {
                "name": "A coin flip shall determine which team gets the first possession."
            }, {
                "name": "The regular playing time shall be a period of 6 minutes (i.e., 3+1+3) playing time."
            }, {
                "name": "The first team which scores 21 points or more wins the game if it happens before the end of regular playing time."
            }, {
                "name": "Substitutions can be done by any team when the ball becomes dead."
            }, {
                "name": "Each team is granted one team time-out. Any player can call the time-out in a dead ball situation."
            }]
        }],
        "startTime": 1488436200,
        "title": "3v3 basketBall",
    },

    // Volley ball
    {
        "category": 1,
        "sequence": 'd7',
        "coords": [{
            "name": "Niranjan Pawar",
            "phone": "+91 9483462245"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486582771/game/volleyball.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 1000,
            "position": 1
        }, {
            "amount": 5000,
            "position": 2
        }],
        "registration": 500,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Team composition - 6(on court) + 4"
            }, {
                "name": "3 sets(first 2 sets of 25 points and decider 15 points) },"
            }, {
                "name": "Conducted as per IVF Rules"
            }, {
                "name": "Participants from engineering colleges only."
            }]
        }],
        "startTime": 1488436200,
        "title": "Volleyball",
    },

    // Badminton
    {
        "category": 1,
        "sequence": 'd8',
        "coords": [{
            "name": "Niranjan Pawar",
            "phone": "+91 9483462245"
        }, {
            "name": "Aditya",
            "phone": "+91 7411918150"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486582710/game/badminton.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 2500,
            "position": 2
        }],
        "registration": 1000,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "BAI rules will apply"
            }, {
                "name": "Entry limited to 16 teams, first come first serve basis."
            }, {
                "name": "College ID is mandatory."
            }, {
                "name": "Teams shall consist of 5 players each, format of 2 singles and 1 doubles match will be played."
            }, {
                "name": "All matches shall be played for 21 points (3 sets) on knockout basis."
            }, {
                "name": "Players must wear non-marking shoes on court."
            }, {
                "name": "Decision of the organizing committee would be final."
            }]
        }],
        "startTime": 1488436200,
        "title": "Badminton",
    },

    // Hunger games
    {
        "category": 1,
        "sequence": 'd9',
        "coords": [{
            "name": "Dheeraj Singh",
            "phone": "+91 8884329319"
        }],
        "description": "Get ready for a race down the memory lane. Pass through all the hurdles that are blocking your path to ultimate delicacies. \n\n 'May the odds be ever in your favour'",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1487025583/hunger_games.jpg",
        "prizes": [{
            "amount": 1500,
            "position": 1
        }],
        "registration": 150,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "This is a team based event with 2 members per team." },
                { "name": "This will be a 3 obstacle event and at the end of each one there will be a food item which has to be finished in order to move on to the next obstacle." },
                { "name": "At the end of each obstacle, the team which finishes last will be eliminated." },
                { "name": "A big prize awaits you at the end of the three obstacles." },
            ]
        }],
        "startTime": 1488436200,
        "title": "Hunger Games",
    },

    // Treasure hunt
    {
        "category": 1,
        "sequence": 'e0',
        "coords": [{
            "name": "Srinabh",
            "phone": "+91 8971329284"
        }, {
            "name": "Akshata",
            "phone": "+91 90305713912"
        }],
        "description": "Ahoy there! Do you have the knack to crack codes? Grab your maps and compasses and get going. The real treasure, after all, is in the hunt. Bring out the intrepid explorer in you  and find out the worth of the Pirate's promise in the Treasure Hunt at Anaadyanta '17.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/c_scale,h_766,w_1268/v1486984931/games/FOX.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 4000,
            "position": 1
        }],
        "registration": 250,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [
                { "name": "Team must comprise of 5 members." },
                { "name": "No team from NMIT will take part in the event." },
                { "name": "Teams can comprise of students from any mix of colleges." },
                { "name": "Everybody starts with a puzzle." },
                { "name": "Each puzzle, when solved will indicate to a unique place inside the campus." },
                { "name": "The coordinator’s decision is final." },

            ]
        }],
        "startTime": 1486578600,
        "title": "Treasure Hunt",
    },

    //// Technical

    // Cube open 2017
    {
        "category": 3,
        "sequence": 'a0',
        "coords": [{
            "name": "Shivam Dubey",
            "phone": "+91 8050225474"
        }, {
            "name": "Jeffrey Sam Joseph",
            "phone": "+91 9482919513"
        }],
        "description": "Love to solve Rubik’s Cube and Rubik’s Revenge? Here is the chance to solve it in the least time than the others and take away a good prize in WCA's official event. Take part in any of the following events: 2x2, 3x3, 4x4 and Pyraminx.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581233/tech/rubiks.jpg",
        "isGroup": false,
        "registration": "Rs. 200 + (Rs. 50 per additional event.)",
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Full schedule",
                "subContent": [
                    { "name": "09:00AM - 10:30AM: Registration & 4x4x4 Round 1" },
                    { "name": "10:30AM - 11:30AM: Pyraminx Round 1" },
                    { "name": "11:30AM - 12:30PM: 2x2x2 Round 1" },
                    { "name": "12:30PM - 01:00PM: LUNCH" },
                    { "name": "01:00PM - 03:30PM: 3x3x3 Round 1" },
                    { "name": "03:30PM - 04:00PM: Pyraminx Finals" },
                    { "name": "04:00PM - 04:30PM: 4x4x4 Finals" },
                    { "name": "04:30PM - 05:00PM: 3x3x3 Round 2" },
                    { "name": "05:00PM - 05:30PM: 2x2x2 Finals" },
                    { "name": "05:30PM - 06:00PM: 3x3x3 Finals" },
                ]
            },
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "All World Cubing Association (WCA) rules will be applicable"
                }, {
                    "name": "General rules will be announced before starting of the event."
                }, {
                    "name": "Judgment Criteria will be based on WCA."
                }, {
                    "name": "Participants must carry a valid ID card."
                }]
            }
        ],
        "startTime": 1488436200,
        "title": "Cube Open 2017",
    },
    // Hackmania
    {
        "category": 3,
        "sequence": 'a1',
        "description": "If you are a creative programmer, this is the event you should exactly look for. The theme is “Cashless Economy”, based on which a usable application has to be created. Finally, the team has to give a demonstration of its application for about 10 min.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581114/tech/hackmania.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": "Worth 1 Lakh",
            "position": 1
        }],
        "registration": "FREE",
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "The duration of the event is 24 hours."
                }, {
                    "name": "The team should consist of not more than 3 students."
                }, {
                    "name": "The application can be developed on any platform."
                }, {
                    "name": "Laptops are allowed."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgment criteria",
                "subContent": [{
                    "name": "Creativity involved in the application developed."
                }, {
                    "name": "Relevance to the theme given."
                }, {
                    "name": "The application can be developed on any platform."
                }, {
                    "name": "Effectiveness of the demonstration given at the end."
                }]
            }],
        "startTime": 1488436200,
        "title": "Hackmania",
    },

    // Robowars
    {
        "category": 3,
        "sequence": 'a2',
        "coords": [{
            "name": "Prabodh",
            "phone": "+91 9036543295"
        }, {
            "name": "Gaurav Kulkarni",
            "phone": "+91 8277605437"
        }],
        "description": "The traditional headline of the tech fest will witness the bots taking on each other unleashing their weapons.  Dab, hammer, turtle and corner your opponent to stand as the Roboking !",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486537047/193125d2fc753c190e22fca175e15fd10316cb85_m8oczb.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 40000,
            "position": 1
        }, {
            "amount": 35000,
            "position": 2
        }],
        "registration": 700,
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Three rounds per bout of 120s."
                }, {
                    "name": "Max of five participants per team."
                }, {
                    "name": "Bout might end with a knockout"
                }, {
                    "name": "Final decision based on the damage."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Degree of damage."
                }, {
                    "name": "Time taken."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Specifications",
                "subContent": [{
                    "hasSubItem": true,
                    "name": "Dimensions and Fabrications",
                    "subContent": [{
                        "name": "The machine should fit in a box of dimension 800mm x 800mm x 1000 mm (l x b x h) at any given point during the match. The external device used to control the machine or any external tank is not included in the size constraint."
                    }, {
                        "name": "The machine should not exceed 60 kg of weight including the weight of pneumatic source/tank. All pneumatic tanks/source and batteries should be onboard. Weight of remote controller will not be counted."
                    }]
                }, {
                    "hasSubItem": true,
                    "name": "Mobility",
                    "subContent": [{
                        "name": "All robots must have easily visible and controlled mobility in order to compete. They includes following"
                    }, {
                        "name": "Rolling (wheels, tracks or the whole robot)."
                    }, {
                        "name": "Non-wheeled robots having no rolling elements in contact with the floor and no continuous rolling or cam operated motion in contact with the floor, either directly or via a linkage. Motion is \"continuous\" if continuous operation of the drive motor(s) produces continuous motion of the robot. Linear-actuated legs and novel non-wheeled drive systems come under this category."
                    }, {
                        "name": "Flying (using airfoil, helium balloons, ornithopters, etc.) is not allowed."
                    }]
                }, {
                    "hasSubItem": true,
                    "name": "Robot Control Requirements",
                    "subContent": [{
                        "name": "The machine can be controlled through wireless remote only. Power supply should be on board only. Refer below for further details on battery and power."
                    }, {
                        "name": "There should be binding capability between transmitters and receivers. The remote with such facility will only be allowed."
                    }, {
                        "name": "The team must have at least four frequency wireless remote control circuit or two dual control circuits which may be interchanged before the start of the race to avoid frequency interference with other teams. The case of any interference in the wireless systems will not be considered for rematch or results."
                    }]
                }, {
                    "hasSubItem": true,
                    "name": "Battery and Power",
                    "subContent": [{
                        "name": "The machine can be powered electrically only. Use of an IC engine in any form is not allowed. On board batteries must be sealed, immobilized-electrolyte types (such as gel cells, lithium, NiCad, NiMH, or dry cells)."
                    }, {
                        "name": "The electric voltage between 2 points anywhere in the machine should not be more than 36V DC at any point of time."
                    }]
                }, {
                    "hasSubItem": true,
                    "name": "Pneumatics",
                    "subContent": [{
                        "name": "Robot can use pressurized non-inflammable gases to actuate pneumatic devices. Maximum allowed outlet nozzle pressure is 10 bar. The storage tank and pressure regulators used by teams need to be certified and teams using pneumatics are required to produce the Safety and Security letters at the Registration Desk at the venue. Failing to do so will lead to direct disqualification."
                    }, {
                        "name": "All hydraulic components on-board must be securely mounted. Special care must be taken while mounting pump, accumulator and armor to ensure that if ruptured direct fluid streams will not escape the robot."
                    }]
                }, {
                    "hasSubItem": true,
                    "name": "Hydraulics",
                    "subContent": [{
                        "name": "Robot can use non-inflammable liquid to actuate hydraulic devices e.g. cylinders."
                    }, {
                        "name": "The electric voltage between 2 points anywhere in the machine should not be more than 36V DC at any point of time."
                    }]
                }, {
                    "description": "Robots can have any kind of magnetic weapons, cutters, flippers, saws, lifting devices, spinning hammers etc. as weapons with following exceptions and limitations:",
                    "hasSubItem": true,
                    "name": "Weapons system",
                    "subContent": [{
                        "name": "Liquid projectiles."
                    }, {
                        "name": "Any kind of inflammable liquid."
                    }, {
                        "name": "Flame-based weapons."
                    }]
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Safety Rules",
                "subContent": [{
                    "name": "Special care should be taken to protect the on-board batteries and pneumatics, robot without proper protection will not be allowed to compete."
                }, {
                    "name": "If you have a robot or weapon design that does not fit within the categories set forth in these rules or is in some way ambiguous or borderline, please contact the event organizers. Safe innovation is always encouraged, but surprising the organizers with your brilliant exploitation of a loophole may cause your robot to be disqualified before it even competes."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Event specific Terminologies",
                "subContent": [{
                    "description": "A robot is not functioning correctly due to either an internal malfunction, or contact with the opposing robot or Arena Hazard.",
                    "name": "Disabled"
                }, {
                    "description": "A Robot is no longer permitted to compete in the current Robowars Tournament.",
                    "name": "Disqualification"
                }, {
                    "description": "In Judge's opinion, a robot is not responsive for a specified period of time.",
                    "name": "Immobilized"
                }, {
                    "description": "Occurs when the attack or deliberate actions of one robot causes its opponent to become immobilized.",
                    "name": "Knockout"
                }, {
                    "description": "Occurs when one robot, through sheer force, holds an opponent stationary in order to immobilize it.",
                    "name": "Pinning"
                }]
            }],
        "startTime": 1487269800,
        "title": "RoboWars",
    },

    // Quad speed
    {
        "category": 3,
        "sequence": 'a3',
        "coords": [{
            "name": "Roshan Sah",
            "phone": "+91 8970283716"
        }, {
            "name": "Dipendra Gupta",
            "phone": "+91 7411251598"
        }],
        "description": "Participants have to bring their built or bought quad copters for racing around air obstacles and beating the time of others.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581115/tech/quad_speed.jpg",
        "isGroup": true,
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "The built/bought copters is limited with specification (50cm*50cm)."
                }, {
                    "name": "Three participants per team. "
                }, {
                    "name": "No modifications to a default bought copter."
                }, {
                    "name": "Five rounds of increasing difficulty with filtering in each round."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Completion of each round."
                }, {
                    "name": "Time taken. "
                }, {
                    "name": "Failure of the model mid-flight which leads to direct disqualification."
                }, {
                    "name": "Five rounds of increasing difficulty with filtering in each round."
                }]
            }],
        "startTime": 1488436200,
        "title": "Quad Speed",
    },

    // RC plane
    {
        "category": 3,
        "sequence": 'a4',
        "coords": [{
            "name": "Apurva Anand",
            "phone": "+91 9036285404"
        }, {
            "name": "Prabin Sherpaili",
            "phone": "+91 9591573884"
        }],
        "description": "Students must design, fabricate, and demonstrate the aircraft which is capable of achieving the highest score on the specified mission profile(s).",
        "endTime": 1489051800,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581117/tech/rc_plane.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 15000,
            "position": 1
        }, {
            "amount": 12000,
            "position": 2
        }],
        "registration": "500",
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "A maximum of 4 members are allowed in each team."
            }, {
                "name": "The aircraft may be of any configuration except rotary wing or lighter than-air. No structure/components may be dropped from the aircraft during flight."
            }, {
                "name": "Must be propeller driven and electric powered with an unmodified over-the-counter model electric motor. May use multiple motors and/or propellers. May be direct drive or with gear or belt reduction."
            }, {
                "name": "Motors may be any commercial brush or brushless electric motor."
            }, {
                "name": "For safety, each aircraft will use commercially produced propeller/blades. Must use a commercially available propeller hub/pitch mechanism. Teams may modify the propeller diameter by clipping the tip and may paint the blades to balance the propeller. No other modifications to the propeller are allowed. Commercial ducted fan units are allowed."
            }, {
                "name": "Battery pack(s) maximum weight limit is 1.75 lb."
            }, {
                "name": "eams will be allowed a maximum of 4 flight attempts or 3 successful scoring flights. Once a mission has a successful scoring flight it may NOT be repeated to try to improve the score."
            }, {
                "name": "Teams will be allowed a maximum of 4 flight attempts or 3 successful scoring flights. Once a mission has a successful scoring flight it may NOT be repeated to try to improve the score."
            }, {
                "name": "If in doubt, Judges will have the discretion to ask team to demonstrate most demanding mission."
            }, {
                "name": "Huddles will be explained on the spot."
            }, {
                "name": "Make sure that the aircraft can perform maneuvers in all three axis i.e. longitudinal, vertical and lateral axis."
            }, {
                "name": "The overall team score is a combination of the Design, of the Aircraft and Flight scores. The team with the highest overall team score will be declared the winner."
            }]
        }, {
            "description": "Grading of complete event will be as follows:",
            "hasSubItem": true,
            "isHeader": true,
            "name": "Judgement criteria",
            "subContent": [{
                "name": "Design: 20 %"
            }, {
                "name": "Flying: 80 %"
            }]
        }],
        "startTime": 1489041000,
        "title": "RC Aeroplane",
    },

    // Hydro rocket
    {
        "category": 3,
        "sequence": 'a5',
        "coords": [{
            "name": "Anand Shah",
            "phone": "+91 9620288342"
        }, {
            "name": "Aakrit Jaiswal",
            "phone": "+91 9900283952"
        }],
        "description": "Design and launch a hydro rocket that can go as high as possible and land right at the launch point to nail it perfectly.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984861/games/ROCKET.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "A maximum of 3 members are allowed in each team."
            }, {
                "name": "The participants have to bring their own rocket (except the launcher and pump)."
            }, {
                "name": "The competitors are encouraged to be creative in the design of the fins and the nose cones of their rockets."
            }, {
                "name": "The rockets are to be launched vertically from the center of the concentric circles with a radius of 1m, 2m and 3m."
            }, {
                "name": "Any interference in the launch caused by the participants will result in the deduction of their points and a second chance will be given to the launching team."
            }, {
                "name": "Battery pack(s) maximum weight limit is 1.75 lb."
            }, {
                "name": "The participants can vary the volume of water used but the air pressure will be specified on the spot."
            }, {
                "name": "Each team will be given a maximum of 2 trials and the best among the 2 will be considered."
            }, {
                "name": "Points will be awarded based on the vertical distance travelled by the rocket and the point where it lands after the flight. The team with the maximum points will be declared as the winner."
            }, {
                "name": "In case of a draw, there will be a third launch between the teams to determine the winner."
            }, {
                "name": "Participants must carry a valid ID card of their institute."
            }]
        }],
        "startTime": 1488436200,
        "title": "Hydro Rocket",
    },

    // FLight simulator
    {
        "category": 3,
        "sequence": 'a6',
        "coords": [{
            "name": "Navaneet",
            "phone": "+91 9739816496"
        }, {
            "name": "Chintan",
            "phone": "+91 9008896352"
        }],
        "description": "This event will check the knowledge of the participants in aircraft performance and control on Microsoft Flight SimulatorX. Time and maneuvers are critical for score.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486984897/games/FLIGHT.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "All the participants will be given a mission on the spot which they have to complete."
            }, {
                "name": "The judgment will be done on multiple fronts viz, time taken to complete, fuel consumed, structural damages etc."
            }, {
                "name": "The complete list of judgment criteria and the scoring scheme will be announced by the coordinator along with the mission requirements."
            }, {
                "name": "One who completes the mission with highest score (combined) will be declared as winner."
            }, {
                "name": "Participants must carry a valid ID card of their institute."
            }]
        }],
        "startTime": 1488436200,
        "title": "Flight Simulator",
    },

    // Line Follower
    {
        "category": 3,
        "sequence": 'a7',
        "coords": [{
            "name": "Karthik",
            "phone": "+91 8553936108"
        }, {
            "name": "Nandan",
            "phone": "+91 9901767137"
        }],
        "description": "An autonomous robot has to follow black line on a white background and reach from starting line to finishing line as quick as possible.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581115/tech/line_follower.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Robots will be placed at starting point and time will be recorded until it reaches finish line."
                }, {
                    "name": "Each individual will be given two trials."
                }, {
                    "name": "Maximum of two restarts in each trial."
                }, {
                    "name": "If the robot stops or misses the line, then it has to start from the previous check point."
                }, {
                    "name": "The robot must be controlled autonomously with no human aid."
                }, {
                    "name": "The robot cannot have potential more than 12V between any two points."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Arena",
                "subContent": [{
                    "name": "The thickness of the lines will be 30 mm"
                }, {
                    "name": "The arena has two check points in total."
                }]
            }],
        "startTime": 1488436200,
        "title": "Line Follower",
    },

    // Circuitrix
    {
        "category": 3,
        "sequence": 'a8',
        "coords": [{
            "name": "Suryakiran",
            "phone": "+91 9986281443"
        }, {
            "name": "Vincent Raj",
            "phone": "+91 9740941674"
        }],
        "description": "This contest is to test the breadboard circuit analysis skills of the participants. The team that can correct the circuit to get the desired output wins the competition.",
        "endTime": 1488443400,
        "euid": "-KcPmODrE-fAseJgOVmX",
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581113/tech/circuitrix.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 5000,
            "position": 1
        }, {
            "amount": 4000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "The team can have maximum of two members."
            }, {
                "name": "All team members must be currently enrolled as students in colleges.."
            }, {
                "name": "Participants are not allowed to have cell phones with them during the event."
            }, {
                "name": "The decision of the judges is final."
            }, {
                "name": "Participants should not spoil any components or devices provided to them."
            }, {
                "name": "Number of rounds will be decided depending on the number of teams taking part in the event."
            }, {
                "name": "Participants must carry a valid ID card of their institute."
            }]
        }],
        "startTime": 1488436200,
        "title": "Circuitrix",
    },

    // Full Throttle
    {
        "category": 3,
        "sequence": 'a9',
        "coords": [{
            "name": "Pawan",
            "phone": "+91 9901158810"
        }, {
            "name": "Jayprakash",
            "phone": "+91 9035761592"
        }],
        "description": "Make a wireless remote controlled machine, which can race against other opponents, maneuver and zoom on an off-road dirt track kind of obstacles.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/c_scale,w_409/v1486581117/tech/full_throttle.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 10000,
            "position": 1
        }, {
            "amount": 8000,
            "position": 2
        }],
        "registration": 100,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "The team can have maximum of four members"
            }, {
                "name": "The car must fit into a box of 30cm x 25cm x 20cm at any point in the race."
            }, {
                "name": "The cars are to be fabricated by the team. Cars bought from the market or built from a DIY kit available for purchase will be disqualified."
            }, {
                "name": "The teams are allowed to use a single battery of maximum 15 volts on the car."
            }, {
                "name": "There will be two rounds."
            }, {
                "name": "Participants must carry a valid ID card of their institute."
            }]
        }],
        "startTime": 1488436200,
        "title": "Full Throttle",
    },



    // Debug
    {
        "category": 3,
        "sequence": 'b0',
        "coords": [{
            "name": "Akshdeep",
            "phone": "+91 9632402156"
        }, {
            "name": "Priyesh Kumar",
            "phone": "+91 7795778808"
        }],
        "description": "Can you dive into deep mysterious world or machine mind and find me?. Well I am waiting for you - BUG",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581112/tech/bugmenot.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Team specifications",
                "subContent": [{
                    "name": "A team can consist of minimum of one member and maximum of 2."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "No online help is allowed."
                }, {
                    "name": "The output expected will be informed beforehand."
                }, {
                    "name": "Errors in the program can be any of the following: logical errors, syntactic errors, semantic errors, run-time errors etc."
                }, {
                    "name": "The winner declaration will be solely based on performance in the second round."
                }, {
                    "name": "Event coordinators will hold the right to settle any disputes and their decisions will be final and binding."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rounds",
                "subContent": [{
                    "name": "Round 1: A pen-paper round to test your basic C programming skills. THis round will be the selecting criteria for 2nd round."
                }, {
                    "name": "Round 2: We put you on computer with oreloaded erroneous programs. You need to find and fix the bug in minimum time."
                }]
            }],
        "startTime": 1488436200,
        "title": "Bug Me Not",
    },

    // Onspot
    {
        "category": 3,
        "sequence": 'b1',
        "coords": [{
            "name": "Harsh Singh",
            "phone": "+91 8123358131"
        }, {
            "name": "Rajnarayan Dutta",
            "phone": "+91 9164841394"
        }],
        "description": "Prepare to unleash the coder in you, as this event provides an opportunity to test your coding skills but not in the stereotypical way. This event puts in test your learning curve and ability your ability implement faster.",
        "endTime": 1489132800,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486537074/pairprogramming_f0d3ae7ef121e981e150bfcae4ecb995_ktspjj.jpg",
        "isGroup": true,
        "prizes": [{
            "amount": 6500,
            "position": 1
        }, {
            "amount": 4500,
            "position": 2
        }],
        "registration": "Rs. 100",
        "rules": [
            {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Team specifications",
                "subContent": [{
                    "name": "A team can consist of minimum of one member and maximum of 2."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rounds",
                "subContent": [{
                    "name": "Round 1: This round will test your basic proficiency in programming. The top 5 teams will go to the second round."
                }, {
                    "name": "Round 2: A surprise awaits. Something new welcomes you! The details of this round will be shared just before the start of the round"
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Winners will be announced based on the performance in the particular assignment of this round. The performance in 1st round will not be considered."
                }, {
                    "name": "A GNU/GCC compiler will be used."
                }, {
                    "name": "Resources like internet and reference books are not allowed."
                }, {
                    "name": "Event coordinators will hold the right to settle any disputes and their decisions will be final and binding."
                }, {
                    "name": "The finalized rules will be disclosed five minutes before the actual events."
                }]
            }],
        "startTime": 1489167000,
        "title": "On Spot Programming",
    },

    // Guess the code
    {
        "category": 3,
        "sequence": 'b2',
        "coords": [{
            "name": "Malvin",
            "phone": "+91 9663099295"
        }, {
            "name": "Srinub",
            "phone": "+91 8971389284"
        }, {
            "name": "Akhil",
            "phone": "+91 9538943136"
        }],
        "description": "The participant will be given an executable file which will have a particular output. Based on the output, the participant the guess the code of it and code it to gain points.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581114/tech/guessthecode.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Based on the difficulty of the problem, there are points allocated to them."
                }, {
                    "name": "Person having the highest point by the end of the event will be winner."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "ONE Participant per team."
                }, {
                    "name": "Programming Language C, C++"
                }, {
                    "name": "The finalized rules will be disclosed five minutes before the actual events."
                }, {
                    "name": " Participants must carry a valid ID card of their institute."
                }]
            }],
        "startTime": 1488436200,
        "title": "Guess The Code",
    },

    // Flappy
    {
        "category": 3,
        "sequence": 'b3',
        "coords": [{
            "name": "Yuvraj",
            "phone": "+91 8553622928"
        }],
        "description": "A physical version of the flappy bird game where you need to ‘jump’ the bird with the touch of a button.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581113/tech/flappy_box.jpg",
        "isGroup": false,
        "prizes": [{
            "amount": 3000,
            "position": 1
        }, {
            "amount": 2000,
            "position": 2
        }],
        "registration": 50,
        "rules": [{
            "hasSubItem": true,
            "isHeader": true,
            "name": "Rules",
            "subContent": [{
                "name": "Individual participation"
            }, {
                "name": "Participant with the highest score will be declared as the winner"
            }, {
                "name": "Participants must carry a valid ID card of their institute."
            }]
        }],
        "startTime": 1488436200,
        "title": "Flappy Bird Live",
    },

    // Robo soccer
    {
        "category": 3,
        "sequence": 'b4',
        "coords": [{
            "name": "Prasanna",
            "phone": "+91 9483969007"
        }, {
            "name": "Dipendra",
            "phone": "+91 8147018125"
        }],
        "description": "It’s time for some fun now. Build and Unleash your robot on the field. Let the game begin!!",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581115/tech/robo_soc.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Only 2 participants per team are allowed."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Bot specifications",
                "subContent": [{
                    "name": "The bot dimensions should be less than 30*30*30 (length*width*height) with 5% tolerance"
                }, {
                    "name": "The weight of the bot should not exceed 5kg."
                }, {
                    "name": "Wired or wireless both bots are allowed, but are considered in the same category and are made to compete together"
                }, {
                    "name": "The bots should be operated by batteries only, IC engines are not allowed."
                }, {
                    "name": "The maximum Voltage between any two points in the circuit should not exceed 12V"
                }, {
                    "name": "Batteries should be on board the bot and carrying the batteries are not allowed."
                }, {
                    "name": "All the bots should run by Direct current (DC) only, Alternating Current (AC) bots are not allowed and any external socket is not provided to run the bots, But there will be sockets to charge the rechargeable batteries."
                }, {
                    "name": "The bots may or may not possess a kicking mechanism to put the ball past the goal line."
                }, {
                    "name": "During the event the ball must be exposed and can only be pushed or pulled hence carrying the ball or covering it from the opponent by catching it inside the ball is prohibited."
                }, {
                    "name": "The time duration for the rounds and other specific rules regarding the event will be announced at the event venue."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "The bot which scores the maximum number of goals will be declared as the winner."
                }, {
                    "name": "In case of a tie, a penalty shootout will determine the winner."
                }]
            }],
        "startTime": 1488436200,
        "title": "Robo-soccer",
    },

    //Automotive quiz
    {
        "category": 3,
        "sequence": 'b5',
        "coords": [{
            "name": "Baswaraj Y",
            "phone": "+91 9738768225"
        }, {
            "name": "Kalyan C",
            "phone": "+91 8050792685"
        }, {
            "name": "Akshay Bhat",
            "phone": "+91 8904491980"
        }],
        "description": "A competitive quiz contest with various rounds of different challenges. The questions and tasks will be completely based on automotive industry, market, design and recent technologies.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/c_scale,w_1226/v1486985053/games/AUTO_QUIZ.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "4 rounds of various challenges."
                }, {
                    "name": "Only TWO participants per team."
                }, {
                    "name": "Interaction and communication based tasks"
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Number of correct answers."
                }, {
                    "name": "Judges’ will have the final decision."
                }]
            }],
        "startTime": 1488436200,
        "title": "Automotive Quiz",
    },

    // Paper presentation
    {
        "category": 3,
        "sequence": 'b6',
        "coords": [{
            "name": "Athreya",
            "phone": "+91 9483957700"
        }, {
            "name": "Priyanka",
            "phone": "+91 9886624666"
        }],
        "description": "Presenting a paper from one of the select topics. Must include research work or business model with new, original and innovative idea.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581115/tech/paper_pres.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "The maximum duration of the presentation is 20 minutes."
                }, {
                    "name": "Max of two participants per team."
                }, {
                    "name": "The questionnaire will follow presentation for 10 minutes by assigned judges."
                }, {
                    "name": "Plagiarism is not tolerated"
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Authenticity and originality."
                }, {
                    "name": "Technical data interpretation"
                }, {
                    "name": "Real world application"
                }]
            }],
        "startTime": 1488436200,
        "title": "Paper Presentation",
    },

    // Jahazz
    {
        "category": 3,
        "sequence": 'b7',
        "coords": [{
            "name": "Keerthi P",
            "phone": "+91 9382708205"
        }, {
            "name": "Jayshree",
            "phone": "+91 8904520789"
        }],
        "description": "It’s time to get the boats under the sun and race them around obstacles and zoom ahead of others.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581114/tech/Jahaaz.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Maximum of four participants per team"
                }, {
                    "name": "Dimensions of the boat should not exceed 250*150mm, height is not restricted."
                }, {
                    "name": "Rechargeable battery is a must. (6V)"
                }, {
                    "name": "Solar panels – crude/glass type - 6V"
                }, {
                    "name": "Must be solar powered which will be checked before the start of the race, failing which the team will be disqualified."
                }, {
                    "name": "Must be solar powered which will be checked before the start of the race, failing which the team will be disqualified."
                }, {
                    "name": "Wired/wireless RC is permitted"
                }, {
                    "name": "There will be three rounds based on speed, moving around obstacles; the details of which will be announced before the start of the event."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }],
        "startTime": 1488436200,
        "title": "Jahazz",
    },

    // SETU
    {
        "category": 3,
        "sequence": 'b8',
        "coords": [{
            "name": "Ranjan",
            "phone": "+91 8553663602"
        }, {
            "name": "Shubham",
            "phone": "+91 8867250295"
        }, {
            "name": "Rajesh",
            "phone": "+91 8147533810"
        }],
        "description": "Design a Cable Stayed suspension bridge using Popsicle sticks, cotton strings and Fevicol adhesive that can sustain the maximum possible load with minimum deflection, satisfying the understated constraints.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581113/tech/SETU.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Materials will be provided"
                }, {
                    "name": "Dimensions will be given on the spot"
                }, {
                    "name": "Once the structure is weighed, you are not allowed to modify the structure in any way."
                }, {
                    "name": "6 hours will be provided for making the model."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgment criteria",
                "subContent": [{
                    "name": "Aesthetic view"
                }, {
                    "name": "Dead mass of the Bridge"
                }, {
                    "name": "Vertical Deflection of the center of the bridge deck during failure."
                }, {
                    "name": "Load carried by the structure before failure"
                }]
            }],
        "startTime": 1488436200,
        "title": "SETU",
    },

    // Tall structure
    {
        "category": 3,
        "sequence": 'b9',
        "coords": [{
            "name": "Naveen",
            "phone": "+91 8971078025"
        }, {
            "name": "Karthik",
            "phone": "+91 8861547430"
        }],
        "description": "",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486581113/tech/tall_struct.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Team specifications",
                "subContent": [{
                    "name": "A team may consist of a maximum of 4 members."
                }, {
                    "name": "Students from different educational institutes can form a team."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Design constraint",
                "subContent": [{
                    "name": "Limited spaghetti will be provided"
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Material constraint",
                "subContent": [{
                    "name": "Spaghetti and adhesive material should only be used to build the structure."
                }, {
                    "name": "Spaghetti can be cut or trimmed to any shape and size."
                }, {
                    "name": "Adhesive can only be used to join the spaghetti together. Adhesives cannot be applied on the free surface of the member made of spaghetti that increase in its strength and misleading the results"
                }, {
                    "name": "Any kind of colouring or painting the structure is not allowed."
                }, {
                    "name": "The team will be disqualified it found using any other material other than those mentioned in any part of the structure"
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Testing",
                "subContent": [{
                    "name": "It is tested on the basis of its appearance, stability and height of the structure."
                }]
            }],
        "startTime": 1488436200,
        "title": "Tall Structures",
    },

    // Drop the egg
    {
        "category": 3,
        "sequence": 'c0',
        "coords": [{
            "name": "Shalini S",
            "phone": "+91 7411443447"
        }, {
            "name": "Pooja S",
            "phone": "+91 8123309756"
        }],
        "description": "Egg drop challenge is an on the spot event in which teams have to design a compact structure using different types of materials acquired by them through Auctioning. Teams have to drop the structure from a height of 40ft. The aim is to prevent the egg from cracking.",
        "endTime": 1488443400,
        "image": "https://res.cloudinary.com/dep8pxurn/image/upload/v1486985109/games/EGGS.jpg",
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
                "hasSubItem": true,
                "isHeader": true,
                "name": "Rules",
                "subContent": [{
                    "name": "Maximum size of structure – 30*30*30(cm)"
                }, {
                    "name": "Fixed height – 40 feet"
                }, {
                    "name": "Use of adhesives between Material and Egg is not permitted."
                }, {
                    "name": "Maximum time will be 1 hour for designing the structure after getting material from auctioning"
                }, {
                    "name": "The structure should be dropped with zero velocity."
                }, {
                    "name": "Two chances shall be given to each Team. However, the second chance will lead to a penalty of 10 points"
                }, {
                    "name": "Teams are not allowed to take structure with them."
                }, {
                    "name": "Teams can only use material provided at that time through Auctioning. Using materials from outside will lead to disqualification."
                }, {
                    "name": "Participants must carry a valid ID card of their institute."
                }]
            }, {
                "hasSubItem": true,
                "isHeader": true,
                "name": "Judgement criteria",
                "subContent": [{
                    "name": "Effectiveness & simplicity of the model"
                }, {
                    "name": "Design explanation & Aesthetics"
                }, {
                    "name": "Time to design the model."
                }, {
                    "name": "There will be some penalty in case the model doesn’t work in the first attempt."
                }]
            }],
        "startTime": 1488436200,
        "title": "Drop The Egg",
    },


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
        let key = `${e.category}-${e.sequence}-${e.title.replace(/[^a-zA-Z0-9-_~%]+/g, '-').toLowerCase()}`

        let { currentUser } = this.props

        // alert("complete the list first")
        // return

        this.setState({
            message: "working"
        })
        // if (user) {
        //const newPostKey = firebaseApp.database().ref().child('newEvents').push().key
        const postData = {
            ...e,
            euid: key,
            lastUpdated: moment().unix(),
            startTime: moment("2017-03-02 12:00", "YYYY-MM-DD h:m").unix(),
            endTime: moment("2017-03-02 14:00", "YYYY-MM-DD h:m").unix(),
            isStarted: false,
            isEnded: false,
            updatedBy: currentUser.name,
        }


        const uid = currentUser.uid;
        let updates = {}
        updates['/newEvents/' + key] = postData

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

