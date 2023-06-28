using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // A DbContext instance represents a session with the database and can be used to query and save instances of your entities. DbContext is a combination of the Unit Of Work and Repository patterns.
    public class DataContext : DbContext

    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
    }
}
