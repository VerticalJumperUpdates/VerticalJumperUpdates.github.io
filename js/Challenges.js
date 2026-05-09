const CHALLENGES = {
    easy: [
        {
            name: "Level 1: Der Anfang",
            platforms: [
                {x: 400, y: 700, w: 180, type: 'green'},
                {x: 100, y: 550, w: 180, type: 'green'},
                {x: 350, y: 400, w: 150, type: 'green'},
                {x: 150, y: 250, w: 150, type: 'green'},
                {x: 300, y: 100, w: 100, type: 'gold'}
            ]
        },
        {
            name: "Level 2: Die 1. Bewegung",
            platforms: [
                {x: 400, y: 720, w: 150, type: 'green'},
                {x: 250, y: 550, w: 120, type: 'blue', speed: 60},
                {x: 100, y: 400, w: 120, type: 'blue', speed: 60},
                {x: 400, y: 250, w: 100, type: 'green'},
                {x: 250, y: 100, w: 100, type: 'gold'}
            ]
        },
        {
            name: "Level 3: Die Treppe",
            platforms: [
                {x: 100, y: 700, w: 120, type: 'green'},
                {x: 500, y: 550, w: 100, type: 'orange'},
                {x: 300, y: 400, w: 100, type: 'orange'},
                {x: 100, y: 250, w: 100, type: 'orange'},
                {x: 300, y: 80, w: 100, type: 'gold'}
            ]
        }
    ],
    medium: [
        {
            name: "Level 1: Verschwinden",
            platforms: [
                {x: 400, y: 700, w: 120, type: 'blue', speed: 100},
                {x: 100, y: 550, w: 100, type: 'orange'},
                {x: 500, y: 400, w: 100, type: 'orange'},
                {x: 200, y: 250, w: 80, type: 'blue', speed: 120},
                {x: 400, y: 100, w: 80, type: 'gold'}
            ]
        },
        {
            name: "Level 2: Durch die Wand",
            platforms: [
                {x: 550, y: 700, w: 100, type: 'green'},
                {x: 50,  y: 550, w: 100, type: 'green'},
                {x: 550, y: 400, w: 100, type: 'orange'},
                {x: 50,  y: 250, w: 100, type: 'orange'},
                {x: 300, y: 80, w: 80, type: 'gold'}
            ]
        },
        {
            name: "Level 3: Timing",
            platforms: [
                {x: 100, y: 700, w: 100, type: 'blue', speed: 50},
                {x: 500, y: 550, w: 100, type: 'blue', speed: 100},
                {x: 100, y: 400, w: 100, type: 'blue', speed: 150},
                {x: 300, y: 250, w: 80, type: 'blue', speed: 200},
                {x: 300, y: 60, w: 80, type: 'gold'}
            ]
        }
    ],
    hard: [
        {
            name: "Level 1: Klein aber Fein",
            platforms: [
                {x: 100, y: 680, w: 60, type: 'green'},
                {x: 530, y: 510, w: 20, type: 'green'},
                {x: 280, y: 340, w: 30, type: 'orange'},
                {x: 530, y: 170, w: 30, type: 'orange'},
                {x: 80, y: 0,   w: 20, type: 'gold'}
            ]
        },
        {
            name: "Level 2: Durch die Wand 2.0",
            platforms: [
                {x: 100,  y: 730, w: 60, type: 'green'},
                {x: 500, y: 560, w: 60, type: 'green'},
                {x: 100,  y: 390, w: 60, type: 'orange'},
                {x: 500, y: 220, w: 60, type: 'orange'},
                {x: 100, y: 50, w:40, type:'orange'},
                {x: 530, y: -120, w:30, type:'orange'},
                {x: 300, y: -300,  w: 40, type: 'gold'}
            ]
        },
        {
            name: "Level 3: Das 2. Leben",
            platforms: [
                {x: 320, y: 730, w: 50, type: 'blue', speed: 80},
                {x: 100, y: 560, w: 40, type: 'orange'},
                {x: 540, y: 560, w: 40, type: 'orange'},
                {x: 320, y: 390, w: 60, type: 'blue', speed: 180},
                {x: 320, y: 200, w: 60, type: 'blue', speed: 20},
                {x: 550, y: 30 , w: 20, type: 'orange'},
                {x: 240, y: -150, w: 50, type: 'green'},
                {x: 450, y: -300, w: 40, type:'orange'},
                {x: 120, y: -480, w: 55, type:'orange'},
                {x: 450, y: -660, w: 35, type: 'blue', speed: 120},
                {x: 30, y: -820, w: 10, type:'gold'}
            ]
        }
    ],
    impossible: [
        {
            name: "Das Biest",
            platforms: [
                {x: 80, y: 680, w: 30, type: 'orange'},
                {x: 530, y: 510, w: 20, type: 'orange'},
                {x: 280, y: 340, w: 30, type: 'blue', speed: 250},
                {x: 530, y: 170, w: 30, type: 'blue', speed: 1},
                {x: 40, y: 0,   w: 20, type: 'orange'},
                {x: 360, y: -150, w: 300, type: 'green'},
                {x: 80, y: -320, w: 30, type: 'blue', speed: 260},
                {x: 530, y: -490, w: 20, type: 'blue', speed: 20},
                {x: 280, y: -660, w: 30, type: 'blue', speed: 250},
                {x: 530, y: -830, w: 30, type: 'orange'},
                {x: 40, y: -1000,   w: 20, type: 'orange'},
                {x: 360, y: -1150, w: 20, type: 'blue', speed: 30},
                {x: 360, y: -1310, w: 300, type: 'green'},
                {x: 80, y: -1470, w: 30, type: 'orange', speed: 40},
                {x: 530, y: -1640, w: 30, type: 'orange', speed: 80},
                {x: 280, y: -1810, w: 30, type: 'orange', speed: 120},
                {x: 530, y: -1980, w: 30, type: 'orange',speed: 160},
                {x: 40, y: -2150,   w: 30, type: 'orange', speed:200},
                {x: 360, y: -2300, w: 30, type: 'orange', speed: 240},
                {x: 360, y: -2450, w: 30, type: 'orange', speed: 280},
                {x: 360, y: -2600, w: 30, type: 'orange', speed: 320},
                {x: 360, y: -2750, w: 30, type: 'orange', speed: 360},
                {x: 360, y: -2900, w: 300, type: 'green'},
                {x: 80, y: -3070, w: 200, type: 'green'},
                {x: 530, y: -3240, w: 200, type: 'green'},
                {x: 280, y: -3410, w: 200, type: 'green'},
                {x: 530, y: -3580, w: 200, type: 'green'},
                {x: 40, y: -3750,   w: 200, type: 'green'},
                {x: 300, y: -3900, w: 200, type: 'green'},
                {x: 300, y: -4050, w: 200, type: 'green'},
                {x: 300, y: -4200, w: 200, type: 'green'},
                {x: 300, y: -4350, w: 200, type: 'green'},
                {x: 80, y: -4520, w: 200, type: 'blue', speed: 20},
                {x: 530, y: -4690, w: 200, type: 'blue', speed: 20},
                {x: 280, y: -4860, w: 200, type: 'blue', speed: 20},
                {x: 530, y: -5030, w: 200, type: 'blue', speed: 20},
                {x: 40, y: -5200,   w: 200, type: 'blue', speed: 20},
                {x: 300, y: -5350, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -5500, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -5650, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -5800, w: 200, type: 'blue', speed: 20},
                {x: 80, y: -5970, w: 200, type: 'orange', speed: 20},
                {x: 530, y: -6140, w: 200, type: 'orange', speed: 20},
                {x: 280, y: -6310, w: 200, type: 'orange', speed: 20},
                {x: 530, y: -6480, w: 200, type: 'orange', speed: 20},
                {x: 40, y: -6650,   w: 200, type: 'orange', speed: 20},
                {x: 300, y: -6800, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -6950, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -7100, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -7250, w: 200, type: 'orange', speed: 20},
                {x: 360, y: -7400, w: 300, type: 'green'},
                {x: 80, y: -7580, w: 20, type: 'orange'},
                {x: 500, y:-7760, w:15, type: 'orange', speed: 20},
                {x: 400, y:-7910, w:15, type: 'orange'},
                {x: 100, y:-8060, w:20, type: 'orange'},
                {x: 550, y:-8210, w:20, type: 'orange'},
                {x: 100, y:-8360, w:20, type: 'orange'},
                {x: 550, y:-8510, w:20, type: 'orange'},
                {x: 300, y:-8660, w:20, type: 'orange', speed: 300},
                {x: 300, y:-8810, w:20, type: 'orange', speed: 200},
                {x: 300, y:-8960, w:20, type: 'orange', speed: 100},
                {x: 300, y:-9110, w:20, type: 'orange', speed: 50},
                {x: 300, y:-9260, w:20, type: 'orange'},
                {x: 200, y:-9410, w:15, type:'orange'},
                {x: 350, y: -9560, w:10, type: 'orange'},
                {x: 0, y: -9600, w: 1000, type: 'gold'}
            ]
        }
    ],
    training: [
        {
            name: "Das Biest Abschnitt 1",
            platforms: [
                {x: 80, y: 680, w: 30, type: 'orange'},
                {x: 530, y: 510, w: 20, type: 'orange'},
                {x: 280, y: 340, w: 30, type: 'blue', speed: 250},
                {x: 530, y: 170, w: 30, type: 'blue', speed: 1},
                {x: 40, y: 0,   w: 20, type: 'orange'},
                {x: 360, y: -150, w: 300, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 2",
            platforms: [
                {x: 80, y: 680, w: 30, type: 'blue', speed: 260},
                {x: 530, y: 510, w: 20, type: 'blue', speed: 20},
                {x: 280, y: 340, w: 30, type: 'blue', speed: 250},
                {x: 530, y: 170, w: 30, type: 'orange',},
                {x: 40, y: 0,   w: 20, type: 'orange'},
                {x: 360, y: -150, w: 20, type: 'blue', speed: 30},
                {x: 360, y: -310, w: 300, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 3",
            platforms: [
                {x: 80, y: 680, w: 30, type: 'orange', speed: 40},
                {x: 530, y: 510, w: 30, type: 'orange', speed: 80},
                {x: 280, y: 340, w: 30, type: 'orange', speed: 120},
                {x: 530, y: 170, w: 30, type: 'orange',speed: 160},
                {x: 40, y: 0,   w: 30, type: 'orange', speed:200},
                {x: 360, y: -150, w: 30, type: 'orange', speed: 240},
                {x: 360, y: -300, w: 30, type: 'orange', speed: 280},
                {x: 360, y: -450, w: 30, type: 'orange', speed: 320},
                {x: 360, y: -600, w: 30, type: 'orange', speed: 360},
                {x: 360, y: -750, w: 300, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 4",
            platforms: [
                {x: 80, y: 680, w: 200, type: 'green'},
                {x: 530, y: 510, w: 200, type: 'green'},
                {x: 280, y: 340, w: 200, type: 'green'},
                {x: 530, y: 170, w: 200, type: 'green'},
                {x: 40, y: 0,   w: 200, type: 'green'},
                {x: 300, y: -150, w: 200, type: 'green'},
                {x: 300, y: -300, w: 200, type: 'green'},
                {x: 300, y: -450, w: 200, type: 'green'},
                {x: 300, y: -600, w: 200, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 5",
            platforms: [
                {x: 80, y: 680, w: 200, type: 'blue', speed: 20},
                {x: 530, y: 510, w: 200, type: 'blue', speed: 20},
                {x: 280, y: 340, w: 200, type: 'blue', speed: 20},
                {x: 530, y: 170, w: 200, type: 'blue', speed: 20},
                {x: 40, y: 0,   w: 200, type: 'blue', speed: 20},
                {x: 300, y: -150, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -300, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -450, w: 200, type: 'blue', speed: 20},
                {x: 300, y: -600, w: 200, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 6",
            platforms: [
                {x: 80, y: 680, w: 200, type: 'orange', speed: 20},
                {x: 530, y: 510, w: 200, type: 'orange', speed: 20},
                {x: 280, y: 340, w: 200, type: 'orange', speed: 20},
                {x: 530, y: 170, w: 200, type: 'orange', speed: 20},
                {x: 40, y: 0,   w: 200, type: 'orange', speed: 20},
                {x: 300, y: -150, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -300, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -450, w: 200, type: 'orange', speed: 20},
                {x: 300, y: -600, w: 200, type: 'orange', speed: 20},
                {x: 360, y: -750, w: 300, type: 'gold'}
            ]
        },
        {
            name: "Das Biest Abschnitt 7",
            platforms: [
                {x: 80, y: 680, w: 20, type: 'orange'},
                {x: 500, y:500, w:15, type: 'orange', speed: 20},
                {x: 400, y:350, w:15, type: 'orange'},
                {x: 100, y:200, w:20, type: 'orange'},
                {x: 550, y:50, w:20, type: 'orange'},
                {x: 100, y:-100, w:20, type: 'orange'},
                {x: 550, y:-250, w:20, type: 'orange'},
                {x: 300, y:-400, w:20, type: 'orange', speed: 300},
                {x: 300, y:-550, w:20, type: 'orange', speed: 200},
                {x: 300, y:-700, w:20, type: 'orange', speed: 100},
                {x: 300, y:-850, w:20, type: 'orange', speed: 50},
                {x: 300, y:-1000, w:20, type: 'orange'},
                {x: 200, y:-1150, w:15, type:'orange'},
                {x: 350, y: -1300, w:10, type: 'orange'},
                {x: 0, y: -1400, w: 1000, type: 'gold'}
            ]
        }
    ],
    bonus: [
        {
            name: "GEHEIM LEVEL",
            platforms: [
                {x: 200, y: 700, w: 300, type: 'green'},
                {x: 200, y: 550, w: 300, type: 'green'},
                {x: 565, y: 429, w: 150, type: 'green'},
                {x: 453, y: 297, w: 140, type: 'green'},
                {x: 250, y: 165, w: 200, type: 'green'},
                {x: 250, y: 25, w: 200, type: 'green'},
                {x: 250, y: -112, w: 200, type: 'green'},
                {x: 581, y: -250, w: 130, type: 'green'},
                {x: 248, y: -379, w: 125, type: 'green'},
                {x: 482, y: -509, w: 130, type: 'green'},
                {x: 580, y: -636, w: 110, type: 'green'},
                {x: 357, y: -765, w: 100, type: 'orange'},
                {x: 95, y: -895, w: 95, type: 'green'},
                {x: 177, y: -1035, w: 125, type: 'green'},
                {x: 99, y: -1179, w: 105, type: 'blue', speed: 80},
                {x: 149, y: -1339, w: 130, type: 'green'},
                {x: 243, y: -1484, w: 100, type: 'orange'},
                {x: 173, y: -1624, w: 95, type: 'orange'},
                {x: 269, y: -1778, w: 120, type: 'orange'},
                {x: 455, y: -1913, w: 125, type: 'green'},
                {x: 250, y: -2055, w: 300, type: 'green'},
                {x: 479, y: -2214, w: 110, type: 'green'},
                {x: 91, y: -2349, w: 85, type: 'blue', speed: 110},
                {x: 341, y: -2504, w: 100, type: 'green'},
                {x: 74, y: -2643, w: 85, type: 'blue', speed: 120},
                {x: 410, y: -2782, w: 90, type: 'green'},
                {x: 145, y: -2950, w: 95, type: 'green'},
                {x: 222, y: -3102, w: 105, type: 'orange'},
                {x: 528, y: -3273, w: 85, type: 'green'},
                {x: 237, y: -3434, w: 85, type: 'orange'},
                {x: 411, y: -3574, w: 105, type: 'green'},
                {x: 320, y: -3716, w: 80, type: 'blue', speed: 135},
                {x: 57, y: -3883, w: 100, type: 'green'},
                {x: 250, y: -4035, w: 300, type: 'green'},
                {x: 250, y: -4187, w: 300, type: 'green'},
                {x: 363, y: -4356, w: 85, type: 'orange'},
                {x: 286, y: -4536, w: 100, type: 'orange'},
                {x: 378, y: -4717, w: 80, type: 'blue', speed: 150},
                {x: 290, y: -4890, w: 90, type: 'green'},
                {x: 93, y: -5051, w: 80, type: 'green'},
                {x: 434, y: -5222, w: 75, type: 'orange'},
                {x: 317, y: -5404, w: 85, type: 'blue', speed: 160},
                {x: 558, y: -5561, w: 70, type: 'blue', speed: 170},
                {x: 407, y: -5728, w: 70, type: 'orange'},
                {x: 413, y: -5879, w: 85, type: 'blue', speed: 180},
                {x: 250, y: -6026, w: 250, type: 'green'},
                {x: 250, y: -6198, w: 250, type: 'green'},
                {x: 69, y: -6374, w: 85, type: 'orange'},
                {x: 378, y: -6531, w: 90, type: 'orange'},
                {x: 597, y: -6703, w: 90, type: 'orange'},
                {x: 343, y: -6896, w: 70, type: 'blue', speed: 195},
                {x: 501, y: -7053, w: 75, type: 'blue', speed: 200},
                {x: 328, y: -7216, w: 65, type: 'orange'},
                {x: 350, y: -7394, w: 60, type: 'blue', speed: 205},
                {x: 569, y: -7563, w: 65, type: 'blue', speed: 210},
                {x: 495, y: -7740, w: 65, type: 'blue', speed: 215},
                {x: 230, y: -7914, w: 70, type: 'orange'},
                {x: 250, y: -8080, w: 250, type: 'gold'}
            ]
        }
    ]
};