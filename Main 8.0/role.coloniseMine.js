var roleUpgrade = require('role.longUpgrade');

var roleColoniseMine =
    {
        run: function (creep)
        {

            //ENERGIE abfragen
            switch(creep.carry.energy)
            {
                case creep.carryCapacity:
                {
                    creep.memory.work = 'working';
                    break;
                }
                case 0:
                {
                    creep.memory.work = 'harvesting';
                    break;
                }
            }


            switch(creep.memory.work)
            {
                case 'working':
                    {
                        if(creep.room === creep.memory.targetRoom)
                        {
                            if(creep.room.spawn)
                                for(let flagName in Game.flags)
                                {
                                    var flag = Game.flags[flagName];
                                    if (flag.name === creep.room.name)
                                    {
                                        flag.remove()
                                    }
                                }
                            //buildSpawn
                            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                            if(!constructionSite)
                            {
                                roleUpgrade.run(creep);
                            }
                            else
                            {
                                if(creep.build(constructionSite) === ERR_NOT_IN_RANGE)
                                {
                                    creep.say('🚧build');
                                    creep.moveTo(constructionSite,{visualizePathStyle: {stroke: '#cc6600'}, reusePath: 10});
                                }
                            }

                        }
                        else
                        {
                            var exitRoom = creep.room.findExitTo(creep.memory.targetRoom);
                            creep.moveTo(creep.pos.findClosestByRange(exitRoom), {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
                        }
                        break;
                    }


                case 'harvesting':
                {
                    if(creep.room === creep.memory.targetRoom)
                    {
                        //ENERGY SOURCE
                        var source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
                        var energy_drops = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

                        if (creep.pickup(energy_drops) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('🔄pickup');
                            creep.moveTo(energy_drops, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});

                        } else
                        {
                            if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                            {
                                creep.say('🔄harvest');
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});

                            }

                        }
                    }
                    else
                    {
                        var exitRoom = creep.room.findExitTo(creep.memory.targetRoom);
                        creep.moveTo(creep.pos.findClosestByRange(exitRoom), {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
                    }
                    break;
                }
            }
        }

    };
module.exports = roleColoniseMine;