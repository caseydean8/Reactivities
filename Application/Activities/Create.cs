using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            // What we want to receive as a parameter from our API
            public Activity Activity { get; set; }
        }

        // Validate against a command
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        // Pass command as type of request to be handled
        // 1. Implement interface from IRequestHandler
        // 2. Generate constructor from Handler
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            // 3. Inject DataContext from Persistence in Handler constructor
            private readonly DataContext _context;
            // 4. Initialize field from parameter context
            public Handler(DataContext context)
            {
                _context = context;
            }

            // 5. Set Task to async
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // 6. Add the Activity in memory (not db)
                _context.Activities.Add(request.Activity);
                // 7. Save Changes
                // The task result from SaveChangesAsync() contains the number of state entries written to the database
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create activity");
                // 8. Empty value returned to tell API request is finished
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}