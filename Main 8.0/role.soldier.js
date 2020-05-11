var roleSoldier =
    {
        run: function (creep)
        {

            //console.log(creep.claimController(creep.room.controller));
            if(creep.room.name === creep.memory.targetRoom.name)
            {
                var hostileCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,
                {
                    filter: (creep) => {
                        return (creep.owner !== 'LowLow' || creep.owner !== 'Jheguy2');
                    }});
                var hostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
                {
                        filter: (creep) => {
                            return (creep.owner !== 'LowLow' || creep.owner !== 'Jheguy2');
                    }});
                
                    if(hostileCreep && creep.attack(hostileCreep) === ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(hostileCreep, {visualizePathStyle: {stroke: '#00ff00'}})
                    }
                    else if(hostileStructure && creep.attack(hostileStructure) === ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(hostileStructure, {visualizePathStyle: {stroke: '#00ff00'}})
                    }
                    else
                    {

                        const controller = creep.room.controller;
                        let rangeToController = creep.pos.getRangeTo(controller);
                        if (rangeToController >= 5)
                        {
                            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                        }
                        
                    }


            }
            else
            {
                var exitRoom = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exitRoom), {visualizePathStyle: {stroke: '#00ff00'}, reusePath: 10});
            }
            
        }

    };
module.exports = roleSoldier;