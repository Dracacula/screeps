var roleClaim = require('role.claim');

var roleLongUpgrade =
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

            var exitRoom = creep.room.findExitTo(creep.memory.targetRoom);

            switch(creep.memory.work)
            {
                case 'working':
                {
                    if(creep.room.name === creep.memory.targetRoom)
                    {
                        //TransferTargets
                        var tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                        {
                            filter: (tower) =>
                            {
                                return (tower.structureType === STRUCTURE_TOWER) && tower.structureType.energy < tower.structureType.energyCapacity;
                            }
                        });
                    
                        if(tower > 0)
                        {
                            if(creep.transfer(tower) === ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                            }
                        }
                        else
                        {
                            if(creep.upgradeController(creep.room.controller) == ERR_NOT_OWNER)
                            {
                                roleClaim.run(creep);
                            }
                            else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE)
                            {
                                creep.say('⚡ upgrade');
                                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 10});
                            }
                        }
                    }
                    else
                    {
                        exitRoom = creep.room.findExitTo(creep.memory.targetRoom);
                        creep.moveTo(creep.pos.findClosestByRange(exitRoom), {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
                    }
                    break;
                }


                case 'harvesting':
                {
                    //console.log(creep.room.name);
                    if(creep.room.name === creep.memory.targetRoom)
                    {
                        //ENERGY SOURCE
                        var source = Game.getObjectById(creep.memory.sourceID);
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
                        exitRoom = creep.room.findExitTo(creep.memory.targetRoom);
                        creep.moveTo(creep.pos.findClosestByRange(exitRoom), {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
                    }
                    break;
                }
            }
        }

    };
module.exports = roleLongUpgrade;