var roleScout =
    {
        run: function (creep)
        {
            switch (creep.memory.state)
            {
                case "scouting":
                {
                    if (creep.room.name !== creep.memory.scoutRoom)
                    {
                        let exitDir = Game.map.findExit(creep.room.name, creep.memory.scoutRoom)
                        let exit = creep.pos.findClosestByRange(exitDir);
                        creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                        console.log("controller")

                    }
                    else
                    {

                        let controller = creep.room.controller;

                        let rangeToController = creep.pos.getRangeTo(controller);
                        if (rangeToController >= 5)
                        {
                            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffff00', reusePath: 10}});
                        }
                        else
                        {
                            creep.memory.state = "send Ping!"
                        }
                    }
                    break;
                }

                case "send Ping!":
                {
                    creep.room.createFlag(creep.room.controller.pos, "ClaimingTarget: " + creep.room.name, COLOR_WHITE)
                    break;
                }
            }

        }
    };
module.exports = roleScout;