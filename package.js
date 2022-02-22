class Mod
{
    constructor()
    {
		Logger.info("Loading: Stalker Voices");
		
		ModLoader.onLoad["StalkerVoices"] = require("./src/StalkerVoices.js").onLoadMod;
    }
}

module.exports.Mod = new Mod();