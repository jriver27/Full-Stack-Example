------------------------------------------------------------------------------
-- | THIS SPROC WILL UPDATE A SAMPLE ENTRY IN THE DATABASE
-- | 
-- DATE			USER			MEMO
-- 8/4/2017 | JAVIER RIVERA | Initial Creation
------------------------------------------------------------------------------

ALTER PROCEDURE [dbo].[EditSample]
	@id int,
	@barcode varchar(50),
	@userId smallInt,
	@statusId smallInt
AS
	UPDATE dbo.Samples
	SET
		Barcode = @barcode,
		CreatedBy = @userId,
		StatusId = @statusId
	FROM dbo.Samples
	WHERE Samples.SampleId = @id

	SELECT
		S.Barcode,
		S.CreatedAt,
		U.userId,
		S.SampleId,
		S.StatusId,
		ST.Status
	FROM Samples S
	RIGHT JOIN Statuses ST ON ST.StatusId = S.StatusId
	RIGHT JOIN Users U ON U.UserId = S.CreatedBy

RETURN 0
