using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            // What we want to receive as a parameter from our API
            public Activity Activity { get; set; }
        }

        // Pass command as type of request to be handled
        // 1. Implement interface from IRequestHandler
        // 2. Generate constructor from Handler
        public class Handler : IRequestHandler<Command>
        {
            // 3. Inject DataContext from Persistence in Handler constructor
            private readonly DataContext _context;
            // 4. Initialize field from parameter context
            public Handler(DataContext context)
            {
                _context = context;
            }

            // 5. Set Task to async
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // 6. Add the Activity in memory (not db)
                _context.Activities.Add(request.Activity);
                // 7. Save Changes
                await _context.SaveChangesAsync();
                // 8. Empty value returned to tell API request is finished
                return Unit.Value;
            }
        }
    }
}