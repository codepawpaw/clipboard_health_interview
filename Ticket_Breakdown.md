# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

I assume the table structure is like this:

```
- Facilities
| id  | name  |
|---  |------ |
|  1  |  A    |
|  2  |  B    |

- Agents 
| id  | name  | sex      | etc  |
|-----|-------|----------|------|
|  1  | George|  Male    |      |

- Shifts
| id  | agent_id  | facility_id  | start_at           | end_at              |
|-----|-----------|--------------|--------------------|---------------------|
|  1  |   1       |     1        | 2022-12-12 12:00:00| 2022-12-12 13:00:00 |
|  2  |   1       |     2        | 2022-12-12 14:00:00| 2022-12-12 15:00:00 |    
```

1 agent can have 1 or more shift in the different facility
1 facility can have 1 or more agent

Also i will use my own term here for the time effort estimation

1 Point = 6 hours
2 Point = 12 Hours
3 Point = 18 Hours
4 Point = 24 Hours

## ======================================================

1. Ticket #1
Title: create agent_facility table

Blockers: None

Description:
As an engineer i want to be able put a custom data for each agent that work on a specific facility

Technical Details:
- Create database migration to create a new table called agent_facilities
- The structure will be like this:
```
| id  | agent_id  | facility_id      | guid  |
|-----|-----------|------------------|-------|
|     |           |                  |       |
```

Column description:

1. id
type: integer
autoincrement
primary key

2. agent_id
type: integer
foreign key refer to agents table

3. facility_id
type: integer
foreign key refer to facilities table

4. guid
type: string

constraint:
1. Unique constraint with combination of: 
   - agent_id
   - facility_id
   - guid

Tags: #backend

Time effort estimation: 1 Point

## ======================================================

2. Ticket #2
Title: Create CRUD api for adding new record, update, and delete agent_facilities data

Blockers: Ticket #1

Description:
As an engineer i want to be able add new data/record to agent_facilities table

Technical Details:

    Api path:
    Should follow restful standard

    1. Create api
    HTTP POST /api/agent_facilities
    Header: {
        'Authorization': JWT_KEY
    }
    Body: {
        agent_id: <AGENT_ID>,
        facility_id: <FACILITY_ID>,
        guid: <AGENT_CUSTOM_ID>
    }

    2. Update api
    HTTP PUT /api/agent_facilities/{agent_facility_id}
    Header: {
        'Authorization': JWT_KEY
    }
    Body: {
        guid: <AGENT_CUSTOM_ID>
    }

    3. Delete api
    HTTP DELETE /api/agent_facilities/{agent_facility_id}
    Header: {
        'Authorization': JWT_KEY
    }

    you can received JWT key after successfully login

Tags: #backend

Time effort estimation: 4 Point


## ======================================================

3. Ticket #3
Title: Create api docs for agent facility crud api

Blockers: Ticket #1

Description:
As an engineer i want to be able see the CRUD agent facility api through the api docs, so frontend engineer can easly access the information

Tags: #backend

Time effort estimation: 1 Point


## ======================================================

4. Ticket #4
Title: Create CRUD page for agent facility entity

Blockers: Ticket#3

Description:
As a user/facility admin i want to be able assign, update, and delete an agent to my facility data

Technical Details:

You can use the api specification from the api docs

Tags: #backend

Time effort estimation: 4 Point

## ======================================================
5. Ticket #5
Title: Create api get shifts by agent guid

Blockers: Ticket#3

Description:
As an engineer i want to have an api for getting list of shift by agent guid, so every facility can create a report for each agent

Technical Details:

    Api path:
    Should follow restful standard

    HTTP GET /api/facility/{facility_id}/agent/{agent_guid}/shifts
    Header: {
        'Authorization': JWT_KEY
    }

    you can received JWT key after successfully login

Tags: #backend

Time effort estimation: 2 Point
