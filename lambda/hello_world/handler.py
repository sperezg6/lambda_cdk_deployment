import json
import logging
from typing import Dict, Any

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Simple Hello World Lambda handler
    
    Args:
        event: The event dict that contains the parameters sent when the function is invoked
        context: The context object that contains information about the invocation
        
    Returns:
        A dict with statusCode and body
    """

    logger.info(f"Received event: {json.dumps(event)}")
    
    # Extract name from query parameters if present (for future API Gateway integration)
    name = "World"

    response_message = f"Hello {name} from AWS Lambda using Python 3.11! Deployed from GitHub Actions"

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"  # For CORS when adding API Gateway
        },
        "body": json.dumps({
            "message": response_message,
            "timestamp": context.aws_request_id,
            "function_name": context.function_name,
            "remaining_time_ms": context.get_remaining_time_in_millis()
        })
    }