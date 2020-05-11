var roleMine =
    {
        run: function (creep) {
            //ENERGY SOURCE
            //ENERGIE abfragen
            switch(creep.carry.energy)
            {
                case 50:
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
                case "working":
                {

                    var extensions = creep.room.find(FIND_STRUCTURES,
                        {
                            filter: (structure) =>
                            {
                                return (
                                    structure.structureType === STRUCTURE_SPAWN
                                ) && structure.energy < structure.energyCapacity;
                            }
                        }
                    );
                    var container = creep.room.find(FIND_STRUCTURES,
                        {
                            filter: (structure) =>
                            {
                                return (
                                    //structure.structureType === STRUCTURE_CONTAINER ||
                                    structure.structureType === STRUCTURE_STORAGE
                                ) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                            }
                        }
                    );
                    if(extensions)
                    {
                        if(creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('⚡transfer');
                            creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                        }
                    }
                    else if(container)
                    {

                        if(creep.transfer(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('⚡transfer');
                            creep.moveTo(container[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                        }
                    }

                    else
                    {
                        var _source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
                        if(creep.harvest(_source) === ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(_source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                            creep.say('get Source');
                            creep.memory.isAtSource = false;
                        }
                        else
                        {
    
                            creep.say('🔄mine because full');
                            creep.memory.isAtSource = true;
                        }
                    }
                }

                case "harvesting":
                {
                    var _source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
                    if(creep.harvest(_source) === ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(_source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                        creep.say('get Source');
                        creep.memory.isAtSource = false;
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                    }
                    else
                    {

                        creep.say('🔄mine');
                        creep.memory.isAtSource = true;
                    }
                }
            }

        }
    };
module.exports = roleMine;