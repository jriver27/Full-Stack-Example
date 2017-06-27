CREATE TABLE [dbo].[Samples]
(
	[SampleId] INT NOT NULL PRIMARY KEY, 
    [Barcode] VARCHAR(50) NULL, 
    [CreatedAt] DATE NULL, 
    [CreatedBy] INT NULL, 
    [StatusId] INT NULL
)
