export const graphDataObj = {
    "nodes": [
        {
            "id": "Azad Samaj Party (Kanshiram)",
            "type": "Organization",
            "properties": {}
        },
        {
            "id": "Chander Shekhar Azad @ Ravan",
            "type": "Person",
            "properties": {
                "Role": "Leader"
            }
        },
        {
            "id": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "Event",
            "properties": {
                "Start_Time": "1420 Hrs.",
                "End_Time": "1700 Hrs."
            }
        },
        {
            "id": "Dr. Baba Bhimrao Ambedkar International",
            "type": "Start_Venue",
            "properties": {}
        },
        {
            "id": "Connaught place outer circle",
            "type": "Route",
            "properties": {}
        },
        {
            "id": "Panchkuia Road",
            "type": "Route",
            "properties": {}
        },
        {
            "id": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "End_Venue",
            "properties": {}
        },
        {
            "id": "Bhima Koregaon violence",
            "type": "Reason",
            "properties": {}
        },
        {
            "id": "Chandra Gupta Maurya",
            "type": "Person",
            "properties": {
                "Role": "Organizer",
                "Contact": "9958332010, 8459088950"
            }
        },
        {
            "id": "Azad Samaj Party",
            "type": "Organization",
            "properties": {
                "Political_Affiliation": "Yes"
            }
        },
        {
            "id": "11 Bhikuram Jain Marg, Rajpur Road, Civil Line, Delhi-54",
            "type": "Office_Address",
            "properties": {}
        },
        {
            "id": "15 Janpath New Delhi",
            "type": "Start_Location",
            "properties": {}
        },
        {
            "id": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "End_Location",
            "properties": {}
        },
        {
            "id": "3-4 KMs",
            "type": "Distance",
            "properties": {}
        },
        {
            "id": "1 band, 1 rath, 3 cars",
            "type": "Transportation",
            "properties": {}
        },
        {
            "id": "206^(th) anniversary",
            "type": "Nature_of_event",
            "properties": {}
        }
    ],
    "relationships": [
        {
            "source": "Chander Shekhar Azad @ Ravan",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANIZER"
        },
        {
            "source": "Azad Samaj Party (Kanshiram)",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANISED_BY"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Dr. Baba Bhimrao Ambedkar International",
            "type": "STARTS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Connaught place outer circle",
            "type": "ROUTE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Panchkuia Road",
            "type": "ROUTE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "ENDS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Bhima Koregaon violence",
            "type": "PURPOSE"
        },
        {
            "source": "Chandra Gupta Maurya",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANIZER"
        },
        {
            "source": "Azad Samaj Party",
            "target": "Chandra Gupta Maurya",
            "type": "MEMBER_OF"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "11 Bhikuram Jain Marg, Rajpur Road, Civil Line, Delhi-54",
            "type": "OFFICE_ADDRESS"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "15 Janpath New Delhi",
            "type": "STARTS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "ENDS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "3-4 KMs",
            "type": "DISTANCE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "1 band, 1 rath, 3 cars",
            "type": "TRANSPORTATION"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "206^(th) anniversary",
            "type": "DESCRIPTION"
        }
    ]
}