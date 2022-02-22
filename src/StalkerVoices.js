"use strict";

class StalkerVoices 
{
	static onLoadMod()
	{
		StalkerVoices.makeVoice("Monolith_3")
		StalkerVoices.makeVoice("Bandit_1")
		StalkerVoices.makeVoice("Freedom_1")
		StalkerVoices.makeVoice("Stalker_2")
	}
	
	static makeVoice(voiceId)
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
		}
		
		// add new voice to customization and chharacter
		DatabaseServer.tables.templates.customization[voiceId] = newVoice;
		DatabaseServer.tables.templates.character.push(voiceId);
		
		// locale
		for (const localeID in DatabaseServer.tables.locales.global)
        {
			const newLocale = {
				"Name": locale[voiceId],
				"ShortName": locale[voiceId],
				"Description": locale[voiceId]
			}
			
			DatabaseServer.tables.locales.global[localeID].customization[voiceId] = newLocale;
        }
		
		// add to bots
		for (const botInConfig in config.AddVoicesToBots) {
			for (const botInDb in DatabaseServer.tables.bots.types) {
				if (botInConfig === botInDb) {
					if (config.AddVoicesToBots[botInConfig].AddFollowingVoices.length != 0) {
						if (config.AddVoicesToBots[botInConfig].ReplaceDefaultOnes) {
							DatabaseServer.tables.bots.types[botInDb].appearance.voice = [];
						}
						
						for (const voiceIndex in config.AddVoicesToBots[botInConfig].AddFollowingVoices) {
							DatabaseServer.tables.bots.types[botInDb].appearance.voice.push(config.AddVoicesToBots[botInConfig].AddFollowingVoices[voiceIndex])
						}
						
						//Logger.log(botInConfig)
					}
				}
			}
		}
	}
}

module.exports = StalkerVoices;