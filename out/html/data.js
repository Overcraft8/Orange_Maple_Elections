const tooltipList = [{
    // for organizations and parties
    searchString: "CCF(SS)",
    explanationText: "The Cooperative Commonwealth Federation (Saskatchewan Section)"
    // <img src=img/CCF_logo.jpg>
}, 
{
    searchString: "FLP",
    explanationText: "The Farmer-Labour Party"
}, 
{
    searchString: "CCF",
    explanationText: "Cooperative Commonwealth Federation"
}, 
{
    searchString: "PFLP",
    explanationText: "The Progressive Farmer-Labour Party"
}, 
{
    searchString: "CP(S)", 
    explanationText: "The Communist Party (Saskatchewan)"
},
{
    searchString: "LPS", 
    explanationText: "The Liberal Party of Saskatchewan"
},
{
    searchString: "PPS", 
    explanationText: "The Progressive Party of Saskatchewan"
},
{
    searchString: "CPS", 
    explanationText: "The Conservative Party of Saskatchewan"
},
{
    searchString: "SCPS", 
    explanationText: "The Social Credit Party of Saskatchewan"
}, 
{
    searchString: "UFC(SS)",
    explanationText: "The United Farmers of Canada (Saskatchewan Section)"
},
{
    searchString: "UFPA",
    explanationText: "The United Farmers Political Association."
},
{
    searchString: "CCYM",
    explanationText: "The Cooperative Commonwealth Youth Movement."
},
{
    searchString: "ILP",
    explanationText: "The Independent Labour Party."
},
{
    searchString: "FUL",
    explanationText: "The Farmer's Unity League."
},
{
    searchString: "WUL",
    explanationText: "The Worker's Unity League. "
},
{
    searchString: "Cooperative Coalition", 
    explanationText: "A coalition of Conservatives, Progressives, and Independents",
    detailedText: "The Cooperative Coalition was an effort by Premier James Anderson to unite the anti-Liberal forces of the province against the governing Liberals."
},
//Federal parties
{
    searchString: "CPC", 
    explanationText: "The Conservative Party of Canada"
},
// Other Provincial Parties
{
    searchString: ['UFA', 'United Farmers of Alberta'], 
    explanationText: "The United Farmers of Alberta"
},
{
    searchString: ['DLP', 'Dominion Labor Party'], 
    explanationText: "The Dominion Labor Party", 
    detailedText: "The Dominion Labor Party is of the old labor tradition in Canada and formed in Alberta. It has had limited electoral success in Alberta but is clearly overshadowed by the rising CCF."
},
{
    searchString: ["SPBC", "Socialist Party of British Columbia"], 
    explanationText: "The Socialist Party of British Columbia",
    detailedText: "The Socialist Party of British Columbia is an old Socialist Party that achieved limited electoral success in British Columbia and has contributed to the province's long-standing labor and socialist tradition."
},
{
    searchString: ['ASCP', 'Alberta Social Credit Party'], 
    explanationText: "Alberta Social Credit Party"
},
/*
{
    searchString: "Socialist Party of British Columbia", 
    explanationText: "The Socialist Party of British Columbia",
    detailedText: "The Socialist Party of British Columbia is an old Socialist Party that achieved limited electoral success in British Columbia and has contributed to the province's long-standing labor and socialist tradition."
},*/
// Below organizations
{
    searchString: ['KKK', 'Ku Klux Klan'], 
    explanationText: "The Ku Klux Klan.",
    detailedText: "The Knights of the Ku Klux Klan entered the province in 1926, an import from the United States. American Klansmen left with the treasury in 1927 but by then, the movement had grown popular enough to warrant local leadership. They have primarily railed against the 'unassimilable' immigrants coming from Central and Eastern Europe, and against the Catholic Church. While KKK membership includes members of all old parties, the Conservatives and Progressives raised issues of immigration and education that drew upon prejudicies raised by the KKK in the 1929 election and the KKK has praised Anderson's policies towards those two areas."
},
{
    searchString: "STA", 
    explanationText: "The Saskatchewan Teacher's Alliance. "
},
{
    searchString: "TLC", 
    explanationText: "The Trades and Labour Congress of Canada. "
},
{
    searchString: "CCL", 
    explanationText: "The Canadian Congress of Labour. "
},
{
    searchString: "Res. Workers", 
    explanationText: "Resource workers (lumber, mining, etc.)"
},
];


const colourList = [{
    // For organizations + parties
        word: ['CCF(SS)', 'Cooperative Commonwealth Federation (Saskatchewan Section)'],
        style: "color: #D26E28; font-weight: bold;"
    },
    {
        word: ['FLP', 'Farmer-Labour Party'],
        style: "color: #D26E28; font-weight: bold;"
    },
    {
        word: ['CCF', 'Cooperative Commonwealth Federation'],
        style: "color: #D26E28; font-weight: bold;"
    },
    {
        word: ['PFLP', 'Progressive Farmer-Labour Party'],
        style: "color: #D26E28; font-weight: bold;"
    },
    {
        word: "CP(S)", 
        style: "color: #920c0c; font-weight: bold;"
    },
    {
        word: "LPS", 
        style: "color: #BE0028; font-weight: bold;"
    },
    {
        word: "PPS", 
        style: "color: #7e741ab3; font-weight: bold;"
    },
    {
        word: "CPS", 
        style: "color: #0055A5; font-weight: bold;"
    },
    {
        word: "SCPS", 
        style: "color: #49be39; font-weight: bold;"
    },
    // Federal Parties
    {
        word: "CPC", 
        style: "color: #0055A5; font-weight: bold;"
    },
    {
        word: "UFC(SS)",
        style: "color: #86a71b; font-weight: bold;"
    },
    {
        word: "UFPA",
        style: "color: #86a71b; font-weight: bold;"
    },
    {
        word: "ILP",
        style: "color: #b06262; font-weight: bold;"
    },
    {
        word: "Cooperative Coalition", 
        style: "color: #288ed2; font-weight: bold;"
    },
    {
        word: "CCYM", 
        style: "color: #7b1616; font-weight: bold;"
    },
    {
        word: "FUL", 
        style: "color: #920c0c; font-weight: bold;"
    },
    {
        word: "WUL", 
        style: "color: #920c0c; font-weight: bold;"
    },
    {
        word: ['KKK', 'Ku Klux Klan'], 
        style: "color: #626262; font-weight: bold;"
    },
    {
        word: "STA", 
        style: "color: #b06262; font-weight: bold;"
    },
    {
        word: "TLC", 
        style: "color: #b33a3a; font-weight: bold;"
    },
    {
        word: "CCL", 
        style: "color: #b33a3a; font-weight: bold;"
    },
    // Other provincial parties: 
    {
        word: ['UFA', 'United Farmers of Alberta'],
        style: "color: #86a71b; font-weight: bold;"
    },
    {
        word: ['DLP', 'Dominion Labor Party'],
        style: "color: #a7391b; font-weight: bold;"
    },
    {
        word: ['SPBC', 'Socialist Party of British Columbia'],
        style: "color: #a7391b; font-weight: bold;"
    },
    {
        word: ['ASCP', 'Alberta Social Credit Party'],
        style: "color: #49be39; font-weight: bold;"
    },
    // Below this for states of qdisplays
    /*
    {
        word: "very low", 
        style: "color: #54e02a; font-weight: bold;"
    },
    {
        word: "low", 
        style: "color: #9ae02a; font-weight: bold;"
    },
    {
        word: "medium", 
        style: "color: #e0d12a; font-weight: bold;"
    },
    {
        word: "high", 
        style: "color: #e0702a; font-weight: bold;"
    },
    {
        word: "very high", 
        style: "color: #e0332a; font-weight: bold;"
    },
    //Relationships
    {
        word: "very friendly", 
        style: "color: #54e02a; font-weight: bold;"
    },
    {
        word: "friendly", 
        style: "color: #9ae02a; font-weight: bold;"
    },
    {
        word: "warm", 
        style: "color: #c5e02a; font-weight: bold;"
    },
    {
        word: "neutral", 
        style: "color: #e0d12a; font-weight: bold;"
    },
    {
        word: "cool", 
        style: "color: #e0a62a; font-weight: bold;"
    },
    {
        word: "cold", 
        style: "color: rgb(224, 118, 42); font-weight: bold;"
    },
    {
        word: "frigid", 
        style: "color: rgb(224, 81, 42); font-weight: bold;"
    },
    {
        word: "hostile", 
        style: "color: rgb(224, 48, 42); font-weight: bold;"
    },
    //Population Percentage || Pop
    {
        word: "Scarce", 
        style: "color: #54e02a; font-weight: bold;"
    },
    {
        word: "Scarce", 
        style: "color: #ace02a; font-weight: bold;"
    },
    {
        word: "Prevalent", 
        style: "color: #e0b52a; font-weight: bold;"
    },
    {
        word: "Severe", 
        style: "color: #e0792a; font-weight: bold;"
    },
    {
        word: "Disastrous", 
        style: "color: #e03c2a; font-weight: bold;"
    },*/
    // Militancy
    {
        word: "Nonexistent", 
        style: "color: #3ce02a; font-weight: bold;"
    },
    {
        word: "Very Low", 
        style: "color: #70e02a; font-weight: bold;"
    },
    {
        word: "Low", 
        style: "color: #a0e02a; font-weight: bold;"
    },
    {
        word: "Medium-low", 
        style: "color: #bfe02a; font-weight: bold;"
    },
    {
        word: "Medium", 
        style: "color: #e0b22a; font-weight: bold;"
    },
    {
        word: "High", 
        style: "color: #e07f2a; font-weight: bold;"
    },
    {
        word: "Very High", 
        style: "color: #e0572a; font-weight: bold;"
    },
];


