CREATE TABLE [dbo].[Samples]
(
	[SampleId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Barcode] VARCHAR(50) NULL, 
    [CreatedAt] DATE NULL, 
    [CreatedBy] INT FOREIGN KEY REFERENCES Users(UserId),
    [StatusId] INT FOREIGN KEY REFERENCES Statuses(StatusId)
)
