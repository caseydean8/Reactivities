namespace Domain
{
    // class Activity is an ENTITY or model, and relates to a TABLE in a db. 
    // Each PROPERTY in the entity relates to a COLUMN in that db. Db purists would say an entity is a "relation"
    public class Activity
    {
        // entity framework requires this be named Id for it to be automatically be set to the primary key. If it needed to be set to a different name you would add the attribute [Key]. EF also requires that all of these properties be public
        public Guid Id { get; set; }
        // [Required] // attribute will supply 400 error automatically, but we don't want error handling in Domain layer
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        // This property represents a collection of AppUser objects.
        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}