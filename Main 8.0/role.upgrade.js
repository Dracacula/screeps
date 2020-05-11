var roleUpgrade = 
{
    run: function (creep)
    {

        //upgraded und plaziert roads
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
            case "working":
            {
                //TransferTargets
                var tower = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (tower) =>
                        {
                            return (tower.structureType === STRUCTURE_TOWER) && tower.energy < tower.energyCapacity;
                        }
                    });
                var target = creep.pos.findClosestByPath(tower);
                if(tower.length > 0)
                {
                    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});

                    }
                }
                else
                {
                    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('⚡ upgrade');
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                    }
                }
                break;
            }
            case "harvesting":
            {
                //ENERGY SOURCES
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType === STRUCTURE_STORAGE) &&
                            structure.store[RESOURCE_ENERGY] >= 50);
                    }});
                if (container != null)
                {

                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄withdraw');
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
                    }
                }
                else
                {
                    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE)
                    {
                        creep.say('🔄harvest');
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                    else if (creep.pickup(droppedEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                    {

                        creep.say('🔄withdraw');
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                    }
                }
                break;
            }
        }
    }

};
module.exports = roleUpgrade;