"use strict";

class Mod 
{
	postDBLoad(container)
	{
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		
		Mod.makeVoice("Stalker_Bandit_1", logger, database);
		Mod.makeVoice("Monolith_3", logger, database);
		Mod.makeVoice("Freedom_1", logger, database);
		Mod.makeVoice("Stalker_2", logger, database);
		Mod.makeVoice("ClearSky_1", logger, database);
		Mod.makeVoice("Duty_1", logger, database);
	};
	
	static makeVoice(voiceId, logger, database)
	{
		// constants
		const config = require("../config/config.json");
		let locale = require(`../db/locales/en.json`);
		
		// make da voice
		const newVoice = {
			"_id": voiceId,
			"_name": voiceId,
			"_parent": "5fc100cf95572123ae738483",
			"_type": "Item",
			"_props": {
				"Name": voiceId,
				"ShortName": voiceId,
				"Description": voiceId,
				"Side": ["Usec", "Bear"],
				"Prefab": voiceId
			}
		};
		
		// add new voice to customization and character
		database.templates.customization[voiceId] = newVoice;
		database.templates.character.push(voiceId);
		
		// locale
		for (const localeID in database.locales.global)
        {
			database.locales.global[localeID][`${voiceId} Name`] = locale[voiceId];
        };
		
		// add to bots
		for (const botInConfig in config.AddVoicesToBots) {
			for (const botInDb in database.bots.types) {
				if (botInConfig === botInDb) {
					if (config.AddVoicesToBots[botInConfig].AddFollowingVoices.length != 0) {
						if (config.AddVoicesToBots[botInConfig].ReplaceDefaultOnes) {
							database.bots.types[botInDb].appearance.voice = [];
						};
						
						for (const voiceIndex in config.AddVoicesToBots[botInConfig].AddFollowingVoices) {
							database.bots.types[botInDb].appearance.voice.push(config.AddVoicesToBots[botInConfig].AddFollowingVoices[voiceIndex])
						};
					};
				};
			};
		};
		
	};
};

module.exports = { mod: new Mod() }