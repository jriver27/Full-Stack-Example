------------------------------------------------------------------------------
-- | THIS PROCEDURE WILL RETURN ALL THE USER WITH A LIST OF THEIR SAMPLES

-- DATE			USER			MEMO
-- 8/4/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[allUsers]

AS

 SELECT U.UserId, U.FirstName, U.LastName,
    STUFF(( 
		SELECT ', ' + CAST(S.SampleId AS varchar(5))
        FROM Samples S
        WHERE S.CreatedBy = U.UserId
        FOR XML PATH('') 
        ), 1, 2, '' )
    AS SampleIds
 FROM Users U

