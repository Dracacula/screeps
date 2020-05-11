require('prototype.spawn')();
var roleHarvest = require('role.harvest');
var roleUpgrade = require('role.upgrade');
var roleBuild = require('role.build');
var roleTransport = require('role.transport');
var roleRepair = require('role.repair');
var roleMine = require('role.mine');
var roleWallRepair = require('role.wallRepair');
var roleColoniseMine = require('role.coloniseMine');
var roleLongHarvest = require('role.longHarvest');
var rolelongUpgrade = require('role.longUpgrade');
var roleClaim = require('role.claim');
var roleSoldier = require('role.soldier');
var roleScout = require('role.scout');
var automatedBuilding = require('automatedBuilding');




//LOOP
module.exports.loop = function ()
{
    
    //---------------------------Gehe Alle Räume durch---------------------------
    //Remove All FLAGS
    /*
    for(let flagName in Game.flags) {
        var flag = Game.flags[flagName];
        flag.remove();
    }
    */
    for(let flagName in Game.flags)
    {
        var flag = Game.flags[flagName];
        switch (flag.color)
        {
            case COLOR_WHITE:
            {
                if(flag.room)
                {
                    if(!flag.room.controller.my)
                        var currentClaimTarget = flag.room;
                    else
                        var currentClaimTarget = null;
                        continue

                    //console.log(flag.room);

                }
                break;
            }
            case COLOR_YELLOW:
            {

                if (flag.room)
                {

                    if(flag.room.controller.my)
                    {
                        console.log("Scout: " + flag);
                        var scoutPos = flag;
                    }
                }
                break;
            }
        }


    }

    //Gehe jeden Raum durch alle räume wo ein Creep drinne ist oder eine Struktur von dir
    for(let roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        if (room)
        {
            if (room.controller.my)
            {
                //console.log(room);
                let spawn = room.find(FIND_MY_STRUCTURES, {
                    filter: (cs) => {
                        return (cs.structureType === STRUCTURE_SPAWN);
                    }});
                if (spawn.length === 0)
                {

                    var coloniseTarget = room;
                    //console.log(coloniseTarget);
                }
            }

        }



    }






    //-----------CLEAR MEMORY----------
    for(let name in Memory.creeps)
    {
        if(Game.creeps[name] === undefined)
        {
            delete Memory.creeps[name];
        }
    }




    //--------Geht Alle Spawns durch-------
    for (var spawnName in Game.spawns)
    {
        var spawn = Game.spawns[spawnName];
        spawn.memory.creepsInRoom = spawn.room.find(FIND_CREEPS).length;
        spawn.memory.minMiner = (spawn.room.find(FIND_SOURCES).length);
        spawn.memory.minTransporter = (spawn.room.find(FIND_SOURCES).length);
        spawn.memory.minUpgrader = 2;
        spawn.memory.minBuilder = 2;
        spawn.memory.minClaimer = 1;
        spawn.memory.minRepairer = 1;
        spawn.memory.minwWallRepairer = 0;
        spawn.memory.minSoldier = 2;
        spawn.memory.minScouts = 1;
        spawn.memory.minColoniseMiners = 2;




        //--------- Variablen für jeweiligen Raum ----------
        var creepsInRoom = spawn.room.find(FIND_MY_CREEPS).length;
        var currentMiner = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'mine' && creep.memory.home.name === spawn.room.name);
        var currentGlobalColoniseMiner = _.filter(Game.creeps, (creep) => creep.memory.role === 'coloniseMine' && creep.memory.home.name === spawn.room.name);
        var currentTransporter = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'transport' && creep.memory.home.name === spawn.room.name);
        var currentUpgrader = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'upgrade' && creep.memory.home.name === spawn.room.name);
        var currentBuilder = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'build' && creep.memory.home.name === spawn.room.name);
        var currentClaimer = _.filter(Game.creeps, (creep) => creep.memory.role === 'claim' && creep.memory.home.name === spawn.room.name);
        var currentScouts = _.filter(Game.creeps, (creep) => creep.memory.role === 'scout' && creep.memory.home.name === spawn.room.name);
        var currentRepairer = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'repair' && creep.memory.home.name === spawn.room.name);
        var currentWallRepairer = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'wallRepair' && creep.memory.home.name === spawn.room.name);
        var currentSoldier = _.filter(Game.creeps, (creep) => creep.memory.role === 'soldier' && creep.memory.home.name === spawn.room.name);


        //-------------LOG-------------
        console.log("--------[ROOM: "+spawn.room.name+"]--------[CONTROLLER: "+spawn.room.controller.level+"("+spawn.room.controller.progress+"/"+spawn.room.controller.progressTotal+")]--------[GCL: "+Game.gcl.level+"("+Game.gcl.progress+"/"+Game.gcl.progressTotal+")]--------");
        console.log("ENERGY: " + spawn.room.energyAvailable + "/" + spawn.room.energyCapacityAvailable);
        console.log("Miner: " + currentMiner.length + "/" + spawn.memory.minMiner);
        console.log("Transporter: " + currentTransporter.length + "/" + spawn.memory.minTransporter);
        console.log("Upgrader: " + currentUpgrader.length + "/" + spawn.memory.minUpgrader);
        console.log("Builder: " + currentBuilder.length + "/" + spawn.memory.minBuilder);
        console.log("Claimer: " + currentClaimer.length + "/" + spawn.memory.minClaimer);
        console.log("Repairer: " + currentRepairer.length + "/" + spawn.memory.minRepairer);
        console.log("WallRepairer: " + currentWallRepairer.length + "/" + spawn.memory.minwWallRepairer);
        console.log("Soldier: " + currentSoldier.length + "/" + spawn.memory.minSoldier);
        console.log("ColoniseMiner: " + currentGlobalColoniseMiner.length + "/" + "2");
        console.log("LocalScouts: " + currentScouts.length + "/" + spawn.memory.minScouts);

        //-----------------------------Raum Exits von dem jeweiligen Spawn-----------------------------
        spawn.memory.exits = Game.map.describeExits(spawn.room.name)
        for (var spawnName in Game.spawns)
        {
            var exSpawn = Game.spawns[spawnName];
            if (spawn === exSpawn)
                continue;

            //soll die exits überprüfen und auch schauen ob es bereits einen spawn auf der anderen seite gibt, wenn ja dann break;
            if (spawn.memory.exits[1] !== exSpawn.room.name && spawn.memory.exits[1] !== undefined)
            {
                console.log(spawn.room.name + " Next Claim Target: TOP")
                if(!Game.rooms[spawn.memory.exits[1]])   //is not undefined
                {
                    var scoutRoom = spawn.memory.exits[1]
                }
            }
            else if (spawn.memory.exits[3] !== exSpawn.room.name && spawn.memory.exits[3] !== undefined)
            {
                console.log(spawn.room.name + " Next Claim Target: RIGHT")
                if(!Game.rooms[spawn.memory.exits[3]])   //is not undefined
                {
                    var scoutRoom = spawn.memory.exits[3]
                }
            }
            else if (spawn.memory.exits[5] !== exSpawn.room.name && spawn.memory.exits[5] !== undefined)
            {
                console.log(spawn.room.name + " Next Claim Target: BOTTOM")
                if(!Game.rooms[spawn.memory.exits[5]])   //is not undefined
                {
                    var scoutRoom = spawn.memory.exits[5]
                }
            }
            else if (spawn.memory.exits[7] !== exSpawn.room.name && spawn.memory.exits[7] !== undefined)
            {
                console.log(spawn.room.name + " Next Claim Target: LEFT")
                if(!Game.rooms[spawn.memory.exits[7]])   //is not undefined
                {
                    var scoutRoom = spawn.memory.exits[7]
                }
            }
        }


        //-----------------LOG END-----------------


        //---------------Automated Building---------------
       automatedBuilding.run(spawn);



        //----------------TOWER----------------
        var towers = spawn.room.find(FIND_STRUCTURES,
            {
                filter: (towers) => towers.structureType === STRUCTURE_TOWER
            });
        //TOWER SHOOT
        for(let tower of towers)
        {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS,
                {
                    filter: (creep) => creep.hits < creep.hitsMax
                });
            
            if(target != null)
            {
                tower.attack(target);
            }
            else if (healTarget != null)
            {
                tower.heal(healTarget);
            }
            else
            {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES,
                    {
                        filter: (structure) => {
                            return (
                                (structure.structureType !== STRUCTURE_TOWER ||
                                structure.structureType !== STRUCTURE_SPAWN) &&
                                structure.hits < structure.hitsMax);
                        }});
                if(closestDamagedStructure)
                {
                    //TOWER REPAIR
                    tower.repair(closestDamagedStructure);
                }
            }

        }




        //--------Geht Alle Creeps durch-------
        for (var creepName in Game.creeps)
        {
            var creep = Game.creeps[creepName];

            //----------Rollenzuweisung-------------
            switch (creep.memory.role)
            {
                case 'mine':
                {
                    if (creepsInRoom < 2)
                    {
                        creep.memory.isAlone = true
                    }
                    else
                    {
                        creep.memory.isAlone = false
                    }

                    roleMine.run(creep);
                    break;
                }
                case 'coloniseMine':
                {
                    creep.memory.targetRoom = coloniseTarget
                    roleColoniseMine.run(creep);
                    break;
                }
                case 'transport':
                {
                    roleTransport.run(creep);
                    break;
                }
                case 'upgrade':
                {
                    roleUpgrade.run(creep);
                    break;
                }
                case 'build':
                {
                    roleBuild.run(creep);
                    break;
                }
                case 'scout':
                    {
                        if (scoutPos)
                            creep.memory.scoutPos = scoutPos;
                        
                        roleScout.run(creep);
                        break;
                    }
                case 'claim':
                {

                    creep.memory.targetRoom = currentClaimTarget;

                    roleClaim.run(creep);
                    break;
                }
                case 'repair':
                {
                    roleRepair.run(creep);
                    break;
                }
                case 'wallRepair':
                {
                    roleWallRepair.run(creep);
                    break;
                }
                case 'soldier':
                {
                    roleSoldier.run(creep);
                    break;
                }
            }
            //-------Rollenzuweisung Ende-------------
        }



        //-----------SPAWN für jeweiligen Raum---------------
        //Energy 1200 weil sonst zu viel verschwendet wird für nicht benötigte parts
        if(currentMiner.length < spawn.memory.minMiner) //Miner und AnfangsMiner
        {
            if (currentTransporter < 1)
                spawn.createCustomCreep(300, 'mine', spawn.room);
            else
            {
                spawn.createMiner(spawn.room.energyAvailable, spawn.room);
            }

        }
        else if(currentTransporter.length < spawn.memory.minTransporter)    //Transporter
        {
            if (spawn.room.energyAvailable < 1200)
                spawn.createTransporter(spawn.room.energyAvailable, spawn.room);
            else
                spawn.createTransporter(1200, spawn.room);
        }
        else if(currentUpgrader.length < spawn.memory.minUpgrader)  //Upgrader
        {
            spawn.createUpgrader(spawn.room.energyAvailable, spawn.room);
        }
        else if(currentBuilder.length < spawn.memory.minBuilder)    //Builder
        {
            spawn.createBuilder(spawn.room.energyAvailable, spawn.room);
        }
        else if(currentRepairer.length < spawn.memory.minRepairer)  //Rapairer
        {
            spawn.createRepairer(spawn.room.energyAvailable,spawn.room);
        }
        else if (currentScouts < spawn.memory.minScouts && scoutRoom)   //Scouts
        {
            spawn.createScout(300, spawn.room, scoutRoom);
        }
        else if(currentClaimer.length < spawn.memory.minClaimer && spawn.room.energyAvailable > 650 && currentClaimTarget)  //Claimer
        {
            spawn.createClaimer(spawn.room.energyAvailable, currentClaimTarget.room,spawn.room);
        }
        else if(currentWallRepairer.length < spawn.memory.minwWallRepairer) //Wall Repairer
        {
            spawn.createWallRepairer(spawn.room.energyAvailable,spawn.room);
        }
        else if(currentSoldier.length < spawn.memory.minSoldier)    //Soldier
        {
            spawn.createSoldier(spawn.room.energyAvailable, spawn.room, spawn.room); //spawn.memory.room_right);
        }
        else if (coloniseTarget && currentGlobalColoniseMiner.length < 2)   //colonise Miner
        {
            spawn.createColoniseMiner(300, spawn.room, coloniseTarget.find(FIND_SOURCES));
        }



    }
};