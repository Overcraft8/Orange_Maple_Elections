const tooltipList = [{
    // for organizations and parties
    searchString: "FLP",
    explanationText: "The Farmer-Labour Group - Our Party"
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
    explanationText: "The United Farmers Political Association. \n They have merged into the FLP"
},
{
    searchString: "CCYM",
    explanationText: "The Cooperative Commonwealth Youth Movement."
},
{
    searchString: "ILP",
    explanationText: "The Independent Labour Party.\n They have merged into the FLP. "
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
    explanationText: "A coalition of Conservatives, Progressives, and Independents"
},
//Federal parties
{
    searchString: "CPC", 
    explanationText: "The Conservative Party of Canada"
},
// Below organizations
{
    searchString: "KKK", 
    explanationText: "The Ku Klux Klan."
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
        word: "FLP",
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
        style: "color: #d8ce6fb3; font-weight: bold;"
    },
    {
        word: "CPS", 
        style: "color: #0055A5; font-weight: bold;"
    },
    {
        word: "SCPS", 
        style: "color: #50E23D; font-weight: bold;"
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
        word: "Far Left", 
        style: "color: #7b1616; font-weight: bold;"
    },
    {
        word: "Reformist", 
        style: "color: #d26e28; font-weight: bold;"
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
        word: "Ku Klux Klan", 
        style: "color: #626262; font-weight: bold;"
    },
    {
        word: "KKK", 
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


