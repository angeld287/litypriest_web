/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
    id
    name
    category {
      id
      name
      description
      module
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
    id
    name
    category {
      id
      name
      description
      module
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
    id
    name
    category {
      id
      name
      description
      module
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const onCreateContact = `subscription OnCreateContact {
  onCreateContact {
    id
    name
    phone
    events {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateContact = `subscription OnUpdateContact {
  onUpdateContact {
    id
    name
    phone
    events {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteContact = `subscription OnDeleteContact {
  onDeleteContact {
    id
    name
    phone
    events {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
    id
    name
    description
    module
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
    id
    name
    description
    module
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
    id
    name
    description
    module
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    name
    category {
      id
      name
      description
      module
    }
    date
    description
    location {
      id
      name
      category {
        id
        name
        description
        module
      }
      contact {
        id
        name
        phone
      }
    }
    contacts {
      items {
        id
      }
      nextToken
    }
    secretary
    priest
    createdAt
    duration
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    name
    category {
      id
      name
      description
      module
    }
    date
    description
    location {
      id
      name
      category {
        id
        name
        description
        module
      }
      contact {
        id
        name
        phone
      }
    }
    contacts {
      items {
        id
      }
      nextToken
    }
    secretary
    priest
    createdAt
    duration
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    name
    category {
      id
      name
      description
      module
    }
    date
    description
    location {
      id
      name
      category {
        id
        name
        description
        module
      }
      contact {
        id
        name
        phone
      }
    }
    contacts {
      items {
        id
      }
      nextToken
    }
    secretary
    priest
    createdAt
    duration
  }
}
`;
export const onCreateEventContacts = `subscription OnCreateEventContacts {
  onCreateEventContacts {
    id
    event {
      id
      name
      category {
        id
        name
        description
        module
      }
      date
      description
      location {
        id
        name
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
      duration
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const onUpdateEventContacts = `subscription OnUpdateEventContacts {
  onUpdateEventContacts {
    id
    event {
      id
      name
      category {
        id
        name
        description
        module
      }
      date
      description
      location {
        id
        name
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
      duration
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
export const onDeleteEventContacts = `subscription OnDeleteEventContacts {
  onDeleteEventContacts {
    id
    event {
      id
      name
      category {
        id
        name
        description
        module
      }
      date
      description
      location {
        id
        name
      }
      contacts {
        nextToken
      }
      secretary
      priest
      createdAt
      duration
    }
    contact {
      id
      name
      phone
      events {
        nextToken
      }
    }
  }
}
`;
