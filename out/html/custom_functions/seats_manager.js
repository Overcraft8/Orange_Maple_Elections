
// Change seats setup : 
// [party_region] -> [ccf_ss_]

var Q = window.dendryUI?.dendryEngine?.state?.qualities;


window.change_seats = function([party_region], [seat_changes]) {
    
    var Q = window.dendryUI?.dendryEngine?.state?.qualities;
}; 

window.preset_demographics = {
    'urban_city' : {
        'workers' : 40, 
        'old_middle' : 20, 
        'new_middle' : 20, 
        'unemployed' : 20
    }, 
    'small_town' : {
        'workers' : 30, 
        'old_middle' : 25, 
        'new_middle' : 25, 
        'unemployed' : 30
    }, 
    'rural_farms' : {
        'workers' : 10, 
        'old_middle' : 5, 
        'new_middle' : 10, 
        'farmers' : 75, 
        'unemployed' : 10
    }, 
    'north' : {
        'workers' : 45, 
        'old_middle' : 15, 
        'new_middle' : 10, 
        'farmers' : 5, 
        'unemployed' : 25
    }
}


Q.new_district_demography = {
    // --- URBAN CONSTITUENCIES ---
    'urban_centres' : {
        'regina_city' : {
            'class_preset' : 'urban_city',
            'class_specifics' : {'workers' : 42, 'new_middle' : 24, 'unemployed' : 18}
        },
        'saskatoon_city' : {
            'class_preset' : 'urban_city',
            'class_specifics' : {'workers' : 40, 'new_middle' : 25, 'unemployed' : 19}
        },
        'moose_jaw_city' : {
            'class_preset' : 'urban_city',
            'class_specifics' : {'workers' : 45, 'old_middle' : 18, 'unemployed' : 22}
        },
        'prince_albert_city' : {
            'class_preset' : 'urban_city',
            'class_specifics' : {'workers' : 38, 'old_middle' : 22, 'unemployed' : 20}
        }
    },

    // --- NORTHWESTERN SASKATCHEWAN ---
    'northwestern' : {
        'cut_knife' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 72, 'workers' : 12, 'unemployed' : 12}
        },
        'meadow_lake' : {
            'class_preset' : 'north',
            'class_specifics' : {'farmers' : 45, 'workers' : 30, 'unemployed' : 20}
        },
        'rosthern' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 78, 'old_middle' : 10, 'unemployed' : 8}
        },
        'shellbrook' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'farmers' : 55, 'workers' : 20, 'unemployed' : 15}
        },
        'the_battlefords' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 32, 'old_middle' : 28, 'unemployed' : 20}
        },
        'turtleford' : {
            'class_preset' : 'north',
            'class_specifics' : {'farmers' : 60, 'workers' : 20, 'unemployed' : 15}
        }
    },

    // --- NORTHEASTERN SASKATCHEWAN ---
    'northeastern' : {
        'humboldt' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 76, 'old_middle' : 12, 'unemployed' : 8}
        },
        'kelvington' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 80, 'workers' : 8, 'unemployed' : 9}
        },
        'kinistino' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 75, 'old_middle' : 14, 'unemployed' : 9}
        },
        'melfort' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 70, 'old_middle' : 16, 'unemployed' : 10}
        },
        'tisdale' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 78, 'workers' : 10, 'unemployed' : 9}
        },
        'watrous' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'farmers' : 60, 'workers' : 18, 'unemployed' : 12}
        },
        'wadena' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 74, 'workers' : 12, 'unemployed' : 10}
        }
    },

    // --- WEST CENTRAL SASKATCHEWAN ---
    'west_central' : {
        'arm_river' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 75, 'old_middle' : 13, 'unemployed' : 9}
        },
        'biggar' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 35, 'farmers' : 45, 'unemployed' : 15}
        },
        'elrose' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 82, 'old_middle' : 10, 'unemployed' : 7}
        },
        'hanley' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 77, 'old_middle' : 12, 'unemployed' : 8}
        },
        'kerrobert_kindersley' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 80, 'old_middle' : 11, 'unemployed' : 7}
        },
        'rosetown' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 76, 'old_middle' : 13, 'unemployed' : 8}
        }
    },

    // --- EAST CENTRAL SASKATCHEWAN ---
    'east_central' : {
        'canora' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'farmers' : 65, 'workers' : 18, 'unemployed' : 12}
        },
        'last_mountain' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 78, 'old_middle' : 11, 'unemployed' : 9}
        },
        'lumsden' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'farmers' : 58, 'old_middle' : 22, 'unemployed' : 15}
        },
        'melville' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 32, 'farmers' : 45, 'unemployed' : 16}
        },
        'saltcoats' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 75, 'old_middle' : 13, 'unemployed' : 10}
        },
        'yorkton' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 30, 'old_middle' : 28, 'unemployed' : 18}
        }
    },

    // --- SOUTHWEST SASKATCHEWAN ---
    'southwest' : {
        'gull_lake' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 72, 'unemployed' : 15, 'workers' : 10}
        },
        'maple_creek' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 68, 'workers' : 15, 'unemployed' : 14}
        },
        'morse' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 75, 'unemployed' : 14, 'workers' : 9}
        },
        'swift_current' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'farmers' : 50, 'workers' : 22, 'unemployed' : 18}
        },
        'notukeu_thunder_creek' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 79, 'unemployed' : 12, 'workers' : 8}
        }
    },

    // --- SOUTHEAST SASKATCHEWAN ---
    'southeast' : {
        'assiniboia' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 74, 'unemployed' : 12, 'workers' : 10}
        },
        'cannington' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 76, 'old_middle' : 12, 'unemployed' : 10}
        },
        'estevan' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 36, 'farmers' : 40, 'unemployed' : 18}
        },
        'montmartre' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 78, 'old_middle' : 11, 'unemployed' : 9}
        },
        'moose_jaw_count' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 70, 'old_middle' : 15, 'unemployed' : 12}
        },
        'q_appelle_wolseley' : {
            'class_preset' : 'rural_farms',
            'class_specifics' : {'farmers' : 72, 'old_middle' : 14, 'unemployed' : 11}
        },
        'souris_estevan' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 34, 'farmers' : 44, 'unemployed' : 16}
        },
        'weyburn' : {
            'class_preset' : 'small_town',
            'class_specifics' : {'workers' : 28, 'old_middle' : 26, 'farmers' : 40, 'unemployed' : 14}
        }
    }
};