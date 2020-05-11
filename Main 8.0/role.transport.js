var roleTransport =
    {
        run: function (creep)
        {
            //Switch Working State
            if(creep.memory.working && creep.carry.energy == 0)
            {
                creep.memory.working = false;
                creep.memory.harvesting = true;
            }
            else if(!creep.memory.working && creep.carry.energy == creep.carryCapacity)
            {
                creep.memory.working = true;
                creep.memory.harvesting = false;
            }

            if (creep.memory.working)
            {
                //TransferTargets
                var extensions = creep.room.find(FIND_STRUCTURES,
                    {
                        filter: (structure) =>
                        {
                            return (
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_EXTENSION
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
                var towers = creep.room.find(FIND_STRUCTURES,
                    {
                        filter: (structure) =>
                        {
                            return (
                                //structure.structureType === STRUCTURE_CONTAINER ||
                                structure.structureType === STRUCTURE_TOWER
                            ) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    }
                );
                if(extensions.length > 0)
                {
                    if(creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('⚡transfer');
                        creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                    }
                }
                else if(towers.length > 0)
                {

                    if(creep.transfer(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('⚡transfer');
                        creep.moveTo(container[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                    }
                }
                else if(container.length > 0)
                {

                    if(creep.transfer(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('⚡transfer');
                        creep.moveTo(container[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                    }
                }

                else
                {
                    creep.memory.working = false;
                    creep.memory.harvesting = true;
                }

            }
            if(creep.memory.harvesting)
            {
                
                    //console.log("HI");
                    //var source = creep.pos.findClosestByPath(container);
                    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    var container = creep.room.find(FIND_STRUCTURES,
                    {
                        filter: (structure) =>
                        {
                            return (
                                    structure.structureType === STRUCTURE_CONTAINER
                                ) && structure.store[RESOURCE_ENERGY] >= 25;
                        }});
                       
                    if (container.length > 0)
                    {
                        
                        if(creep.withdraw(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('⚡withdraw');
                            creep.moveTo(container[0], {visualizePathStyle: {stroke: '#4bff00'}, reusePath: 10});
                        }
                    }
                    else if (creep.pickup(droppedEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {

                        creep.say('🔄withdraw');
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                
            }
        }

    };
module.exports = roleTransport;