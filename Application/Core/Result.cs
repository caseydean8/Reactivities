using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    // When using generic types in this way, specify when creating a new instance of
    // this class that T would be swapped with <Activity> eg when we use it. Then Value
    // will be of type Activity.
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> { IsSuccess = true, Value = value };
        public static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}