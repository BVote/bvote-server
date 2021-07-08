    module.exports = {
        identify: async (parent, { cid, email }, { models }) => {
            return "identify says: you are doing well";
            // rpc
            // return await models.Citizen.findOne(
            //     { cid, email }
            // );
        },
    
        me: async (parent, args, { models, userInformation }) => {
            // find a user given the curent user context
            return await models.Citizen.findById(userInformation.id);
        }
    }