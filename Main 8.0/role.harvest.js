var roleHarvest = 
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
                //TransferTargets
                var tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                    {
                        filter: (tower) =>
                        {
                            return (tower.structureType === STRUCTURE_TOWER) && tower.structureType.energy < tower.structureType.energyCapacity;
                        }
                    });

                if(Game.spawns.Spawn1.room.energyAvailable < Game.spawns.Spawn1.room.energyCapacityAvailable)
                {
                    var spawn = creep.pos.findClosestByPath(FIND_STRUCTURES,
                        {
                            filter: (structure) =>
                            {
                                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN)&& structure.energy < structure.energyCapacity;
                            }
                        }
                    );
                    if(spawn != null)
                        creep.memory.targetID = spawn.id;
                }
                else if(tower != null)
                {
                        creep.memory.targetID = tower.id;
                }
                else if(Game.spawns.Spawn1.room.energyAvailable === Game.spawns.Spawn1.room.energyCapacityAvailable)
                {
                    //TransferTargets
                    var container  = creep.pos.findClosestByPath(FIND_STRUCTURES,
                        {
                            filter: (structure) =>
                            {
                                return (structure.structureType === STRUCTURE_STORAGE|| structure.structureType === STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                            }
                        }
                    );
                    if(container != null)
                        creep.memory.targetID = container.id;
                }
                else
                {
                    creep.say("idle");
                }

                let target = Game.getObjectById(creep.memory.targetID);
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                {
                    creep.say('⚡transfer');
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
                    //creep.pos.
                }

                break;
            }


            case 'harvesting':
            {
                //ENERGY SOURCE
                var source = Game.getObjectById(creep.memory.sourceID);
                var energy_drops = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                
                
                if (energy_drops != null)
                {
                    if(creep.pickup(energy_drops) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄pickup');
                        creep.moveTo(energy_drops, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
    
                    }
                }
                else
                {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                        filter: (s) => 
                        {
                            return (s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0;
                        }
                    });
                    

                    if(container != null)
                    {
                        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('🔄withdraw');
                            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                        }
                    }
                    else
                    {
                        if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                        {
                            creep.say('🔄harvest');
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                        }

                    }
                    

                }
                break;
            }
        }
    }

};
module.exports = roleHarvest;