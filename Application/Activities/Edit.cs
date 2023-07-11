using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        // One downside to this pattern is a lot of boilerplate code in each handler, thus...
        // 1. Implement IRequestHandler interface
        // 2. Generate constructor from Handler
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            // 3. Inject DataContext into Handler constructor
            private readonly DataContext _context;
            // 4. Initialize field from parameter context
            private readonly IMapper _mapper;
            // Inject Imapper into Handler constructor and initialize field from parameter mapper
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // 5. Set Task to async
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Find activity in database by id
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null;
                // Map request activity to activity in/from our db defined above
                _mapper.Map(request.Activity, activity);
                // Save changes to db
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update activity");
                // Notify API work is completed
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}