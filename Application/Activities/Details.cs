using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // Query fetches, doesn't update
        public class Query : IRequest<Activity>
        {
            // Set to public so we have access in our handler
            public Guid Id { get; set; }
        }

        // pass Query as the type of request to be handled and Activity as the type of response from the handler. Then...
        // 1. implement interface for IRequestHandler, see 29
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            // 3. Generate constructor from Handler
            // 4. Inject DataContext from Persistence
            // 5. Initialize field from parameter context
            public Handler(DataContext context)
            {
                _context = context;
            }
            // 2. Designate Task (implemented from IRequestHandler) as async
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // 6. Return Id (see 13) from request
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null) throw new Exception("Activity not found");

                return activity;
            }
        }
    }
}