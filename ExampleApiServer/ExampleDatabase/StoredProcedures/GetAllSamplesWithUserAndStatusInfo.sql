------------------------------------------------------------------------------
-- | THIS SPROC WILL RETURN ALL THE SAMPLES WITH THE USER AND STATUS INFOMRATION.
-- | 
-- DATE			USER			MEMO
-- 8/8/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------
  

CREATE PROCEDURE [dbo].[GetAllSamplesWithUserAndStatusInfo]
AS
	SELECT 
		S.SampleId,
		S.Barcode,
		S.CreatedAt,
		U.UserId,
		U.FirstName,
		U.LastName,
		ST.StatusId,
		ST.Status	
	FROM [dbo].Samples S
	RIGHT JOIN Users U on U.UserId = S.CreatedBy 
	RIGHT JOIN Statuses ST on ST.StatusId = S.StatusId
RETURN 0
