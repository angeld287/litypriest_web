/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLocation = `subscription OnCreateLocation {
  onCreateLocation {
    id
    name
  }
}
`;
export const onUpdateLocation = `subscription OnUpdateLocation {
  onUpdateLocation {
    id
    name
  }
}
`;
export const onDeleteLocation = `subscription OnDeleteLocation {
  onDeleteLocation {
    id
    name
  }
}
`;
export const onCreateContact = `subscription OnCreateContact {
  onCreateContact {
    id
    name
    phone
  }
}
`;
export const onUpdateContact = `subscription OnUpdateContact {
  onUpdateContact {
    id
    name
    phone
  }
}
`;
export const onDeleteContact = `subscription OnDeleteContact {
  onDeleteContact {
    id
    name
    phone
  }
}
`;
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
    id
    name
    description
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
    id
    name
    description
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
    id
    name
    description
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    nombre
    category {
      id
      name
      description
    }
    date
    description
    location {
      id
      name
    }
    contact {
      id
      name
      phone
    }
    createdAt
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    nombre
    category {
      id
      name
      description
    }
    date
    description
    location {
      id
      name
    }
    contact {
      id
      name
      phone
    }
    createdAt
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    nombre
    category {
      id
      name
      description
    }
    date
    description
    location {
      id
      name
    }
    contact {
      id
      name
      phone
    }
    createdAt
  }
}
`;
