'use strict';

exports.getUsers = `
SELECT users.UserDN AS \`DN\`
  , dn.Description AS \`Name\`
  , chmtypes.Description AS \`State\`
    , IF(callhandlingmodes.CallHandlingNote IS NULL, '', callhandlingmodes.CallHandlingNote) AS \`Note\`
    , cfconditiontypes.Description AS \`CF\`
    , CASE
    WHEN callhandlingmodes.CFConditionID = '1' THEN callhandlingmodes.CFAlways
        WHEN callhandlingmodes.CFConditionID = '2' THEN CONCAT(callhandlingmodes.CFNoAnswer, ' / ', callhandlingmodes.CFBusy)
        WHEN callhandlingmodes.CFConditionID = '3' THEN ''
    END AS 'Destination'
    , IF(callhandlingmodes.CFConditionID = '2', callhandlingmodes.CFNARings, '') AS \`Rings\`
    , DATE_FORMAT(callhandlingmodes.LastUpdateUTCTime, '%a, %b %d %Y @ %r') AS \`Updated\`
  FROM users
    LEFT JOIN dn ON (users.UserDN = dn.DN)
    LEFT JOIN chmtypes ON (users.CurrentCHMTypeID = chmtypes.CHMTypeID)
    LEFT JOIN callhandlingmodes ON (users.UserDN = callhandlingmodes.UserDN AND users.CurrentCHMTypeID = callhandlingmodes.CHMTypeID)
    LEFT JOIN cfconditiontypes ON (callhandlingmodes.CFConditionID = cfconditiontypes.CFConditionID)
    WHERE dn.DNTypeID = '1'
    AND users.UserDN IN ('6101'
                            , '6102'
                            , '6104'
                            , '6106'
                            , '6108'
                            , '6110'
                            , '6112'
                            , '6114'
                            , '6115'
                            , '6116'
                            , '6118'
                            , '6120'
                            , '6123'
                            , '6124'
                            , '6134'
                            , '6136'
                            , '6137'
                            , '6138'
                            , '6139'
                            , '6142'
                            , '6143'
                            , '6153'
                            , '6155')
    ORDER BY users.UserDN
`;
