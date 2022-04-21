## Endpoints

List of Available Endpoints:

- `GET /chart`
- `GET /song/:name`
- `GET /song/:name/:title`
- `POST /donation`

### GET /chart

#### Description

- Get 25 top music globally

#### Request

- Headers

  ```json
    {
      params: Date,
      headers: {
        "X-RapidAPI-Host": String,
        "X-RapidAPI-Key": String,
      },
    }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "data": [
      {
        "artist": String,
        "title": String,
        "last_week": Integer,
        "rank": Integer,
        "award": String,
        "image": String,
        "peak_position": Integer,
        "weeks_on_chart": Integer
      },
      ...
    ]
  }
  ```

## GET /song/:name

#### Description

- Get all song by artist

#### Request

- Headers

  ```json
    {
      headers: {
        "X-RapidAPI-Host": String,
        "X-RapidAPI-Key": String,
      },
    }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "data": [
      {
        "singer": String,
        "songName": String,
        "uri": String,
      },
      ...
    ]
  }
  ```

### POST /song/:name/:title`

#### Description

- Find Lyrics by title

#### Request

- Headers

  ```json
    {
      headers: {
        "X-RapidAPI-Host": String,
        "X-RapidAPI-Key": String,
      },
    }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "songName": Srting,
    "songLyrics": String,
  }
  ```

### POST /donation

#### Description

- Process donation

#### Request

- Headers

  ```json
  {
    "transaction_details": {
      "order_id": String,
      "gross_amount": Integer
  }
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "token": String,
    "redirect_url": String
  }
  ```

  _400 - Bad Request_

- Body

  ```json
  {
    "error_messages": [
      String
  ]
  }
  ```

  _500 - Internal Server Error_

- Body
  ```json
  {
    "error_messages": [
      "Sorry, we encountered internal server error. We will fix this soon."
    ]
  }
  ```

### Global Error

#### Response

_503 - Service Temporarily Unavailable_

```json
  {
    "message": String
  };
```
