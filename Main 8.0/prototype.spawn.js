module.exports = function() {

    const ENERGY_MOVE = 50;
    const ENERGY_WORK = 100;
    const ENERGY_CARRY = 50;
    const ENERGY_ATTACK = 80;
    const ENERGY_RANGED_ATTACK = 150;
    const ENERGY_HEAL = 250;
    const ENERGY_CLAIM = 600;
    const ENERGY_TOUGH = 10;


    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, aHomeRoom) {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(energy / (ENERGY_MOVE+ENERGY_CARRY+ENERGY_WORK));
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'Creep' + Game.time, {memory: {role: roleName, home: aHomeRoom, work: 'harvesting'}});
            console.log("Creep spawned with " + numberOfParts + " Parts each Type");
        };

    StructureSpawn.prototype.createMiner =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_WORK*2));
            let body = [];
            if (numberOfParts >= 1)
            {
                for (let i = 0; i < numberOfParts; i++)
                {
                    body.push(MOVE);
                }
                for (let i = 0; i < numberOfParts; i++)
                {
                    body.push(WORK);
                }

                //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

                // create creep with the created body and the given role
                return this.spawnCreep(body, 'Miner' + Game.time, {memory: {role: 'mine', home: aHomeRoom, work: 'harvesting'}});
                console.log("Miner spawned");
            }





        };

    StructureSpawn.prototype.createTransporter =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_CARRY+ENERGY_MOVE));
            let body = [];
            for (let i = 1; i <= numberOfParts; i++)
            {
                body.push(CARRY);
            }
            for (let i = 1; i <= numberOfParts; i++)
            {
                body.push(MOVE);
            }

            //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

            // create creep with the created body and the given role
            return this.spawnCreep(body, 'Transporter' + Game.time, {memory: {role: 'transport', home: aHomeRoom, working: true}});
            console.log("Transporter spawned");
        };

    StructureSpawn.prototype.createUpgrader =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_CARRY+ENERGY_MOVE+ENERGY_WORK));
            let body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

            // create creep with the created body and the given role
            return this.spawnCreep(body, 'Upgrader' + Game.time, {memory: {role: 'upgrade', home: aHomeRoom, work: 'harvesting'}});
            console.log("Upgrader spawned");
        };

    StructureSpawn.prototype.createBuilder =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_CARRY+ENERGY_MOVE+ENERGY_WORK));
            let body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

            // create creep with the created body and the given role
            return this.spawnCreep(body, 'Builder' + Game.time, {memory: {role: 'build', home: aHomeRoom, work: 'harvesting'}});
            console.log("Builder spawned");
        };

    StructureSpawn.prototype.createRepairer =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_CARRY+ENERGY_MOVE+ENERGY_WORK));
            let body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

            // create creep with the created body and the given role
            return this.spawnCreep(body, 'Repairer' + Game.time, {memory: {role: 'repair', home: aHomeRoom, work: 'harvesting'}});
            console.log("Repairer spawned");
        };

    StructureSpawn.prototype.createWallRepairer =
        function(aEnergy, aHomeRoom)
        {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_CARRY+ENERGY_MOVE+ENERGY_WORK));
            let body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            //let energySource = aEnergySources[Math.floor((Math.random() * 0) + 1)];

            // create creep with the created body and the given role
            return this.spawnCreep(body, 'WallRepairer' + Game.time, {memory: {role: 'wallRepair', home: aHomeRoom, work: 'harvesting'}});
            console.log("WallRepairer spawned");
        };

    StructureSpawn.prototype.createLongDistanceHarvester =
        function(energy, numberOfWorkParts, aHomeRoom, target, sourceID) {
            // create a balanced body as big as possible with the given energy
            var body = [];
            for (let i = 0; i < numberOfWorkParts; i++) {
                body.push(WORK);
            }
            energy -= 150 * numberOfWorkParts;

            let numberOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
                body.push(MOVE);
            }



            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'LongHarvester' + Game.time, {memory: {role: 'longHarvest', home: aHomeRoom, work: 'harvesting', targetRoom: target, sourceID: sourceID}});
            console.log("LongHarvester spawned");
        };
        
    StructureSpawn.prototype.createLongDistanceUpgrader =
        function(energy, aHomeRoom, target, sourceID) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }



            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'LongUpgrader' + Game.time, {memory: {role: 'longUpgrade', home: aHomeRoom, work: 'harvesting', targetRoom: target, sourceID: sourceID}});
            console.log("LongUpgrader spawned");
        };

    StructureSpawn.prototype.createClaimer =
        function(aEnergy, aTargetRoom, aHomeRoom) {
            // create a balanced body as big as possible with the given energy
            let numberOfClaimParts = Math.floor(aEnergy / (ENERGY_CLAIM+ENERGY_MOVE));
            var body = [];
            for (let i = 0; i < numberOfClaimParts; i++) {
                body.push(CLAIM);
            }
            for (let i = 0; i < numberOfClaimParts; i++) {
                body.push(MOVE);
            }


            
            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'Claimer' + Game.time, {memory: {role: 'claim', home: aHomeRoom, state: 'moveToRoom', targetRoom: aTargetRoom}});
            console.log("Claimer spawned")
        };
        StructureSpawn.prototype.createSoldier =
        function(energy, aHomeRoom, target) {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(energy / (ENERGY_MOVE+ENERGY_TOUGH+ENERGY_ATTACK));
            var body = [];
            
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(TOUGH);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(ATTACK);
            }


            
            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'Soldier' + Game.time, {memory: {role: 'soldier', home: aHomeRoom,  work: 'working', targetRoom: target}});
            console.log("Soldier spawned");
        };
        
        StructureSpawn.prototype.createScout =
        function(energy, aHomeRoom, aScoutPos) {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(energy / (ENERGY_MOVE));
            var body = [];
            
            for (let i = 0; i < 2; i++)
            {
                body.push(MOVE);
            }
            


            
            // create creep with the created body and the given role
            
            return this.spawnCreep(body, 'Scout' + Game.time, {memory: {role: 'scout', home: aHomeRoom, scoutRoom: aScoutPos, state: "scouting"}});
            console.log("Scout spawned");
        };
    StructureSpawn.prototype.createColoniseMiner =
        function(aEnergy, aHomeRoom, aTargetRoom) {
            // create a balanced body as big as possible with the given energy
            let numberOfParts = Math.floor(aEnergy / (ENERGY_MOVE+ENERGY_CARRY+ENERGY_WORK));
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role

            return this.spawnCreep(body, 'ColoniseMiner' + Game.time, {memory: {role: 'coloniseMine', home: aHomeRoom, work: "harvesting", targetRoom: aTargetRoom}});
            console.log("ColoniseMiner spawned")
        };
};