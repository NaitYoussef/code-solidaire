package com.zeros.backend.infrastructure.repositories;

import com.zeros.backend.domain.models.Entity;
import com.zeros.backend.domain.repositories.Repository;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractInMemoryRepository<T extends Entity> implements Repository<T> {


    private Map<Long, T> entityById;
    private Long idCounter = 0L;

    public AbstractInMemoryRepository() {
        entityById = new HashMap<>();
    }

    @Override
    public T findOne(Long id) {
        return entityById.get(id);
    }

    @Override
    public T save(T entity) {
        try {
            if (!entityById.containsKey(entity.getId())) {
                Field idField = entity.getClass().getSuperclass().getDeclaredField("id");
                idField.setAccessible(true);
                ReflectionUtils.setField(idField, entity, ++idCounter);
            }
            entityById.put(entity.getId(), entity);
            return entity;
        } catch (NoSuchFieldException e) {
            throw new RuntimeException("Entity has no field");
        }
    }

    @Override
    public Iterable<T> findAll() {
        return entityById.values();
    }

    @Override
    public boolean exists(Long id) {
        return entityById.containsKey(id);
    }

    @Override
    public void deleteAll() {
        entityById.clear();
    }

    @Override
    public long count() {
        return entityById.size();
    }

}
