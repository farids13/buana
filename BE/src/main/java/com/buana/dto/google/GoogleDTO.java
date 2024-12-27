package com.buana.dto.google;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record GoogleDTO(
    Request request,
    Response response
) {

    public record Request(
        @Schema(required = true, 
                example = "EAAfvFI3ywG4BAMhHhaDkDnBoyVMWr7O4doB6BrwhPq9n2N7lFXxUnGAL3skueRqnhUkIZCnI5GGXZC7xniVa0NQLPp87B7fpCZCq1Mn124AfTTmDSXbLxvBWgfVmIOJxZBCe9AeW6ltPcPD6xjAVg65JU2FooQxwqUvRBO3J7sGiKRs6VeGKZCYuq98BgRKoZBMj5zEyfGHZAyOBmbWjgDpZAMyzwIL7rCTfLZBpUVPu7HWFGaH6XaTDlTvlEKAmEYZC8ZD", 
                description = "access token from facebook or token id from google")
        String token,

        @Schema(required = true, 
                example = "29bb623e-ede9-4d24-9123-870d779a13fd", 
                description = "UUID format")
        String deviceId
    ) {}

    public record Response(
        String resourceName,
        String etag,
        List<Name> names,
        List<Birthday> birthdays,
        List<EmailAddress> emailAddresses,
        List<Gender> genders
    ) {
        public Response() {
            this("", "", List.of(), List.of(), List.of(), List.of());
        }

        public record Gender(
            Metadata metadata,
            String value,
            String formattedValue
        ) {
            public Gender() {
                this(new Metadata(), "", "");
            }
        }

        public record Birthday(
            Metadata metadata,
            Date date
        ) {
            public Birthday() {
                this(new Metadata(), new Date());
            }
        }

        public record Date(
            int year,
            int month,
            int day
        ) {
            public Date() {
                this(1990, 1, 1);
            }
        }

        public record EmailAddress(
            Metadata metadata,
            String value
        ) {
            public EmailAddress() {
                this(new Metadata(), "");
            }
        }

        public record Metadata(
            boolean primary,
            Source source,
            boolean sourcePrimary,
            boolean verified
        ) {
            public Metadata() {
                this(false, new Source(), false, false);
            }
        }

        public record Name(
            Metadata metadata,
            String displayName,
            String familyName,
            String givenName,
            String displayNameLastFirst,
            String unstructuredName
        ) {
            public Name() {
                this(new Metadata(), "", "", "", "", "");
            }
        }

        public record Source(
            String type,
            String id
        ) {
            public Source() {
                this("", "");
            }
        }
    }
}
